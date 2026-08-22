"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/auth-provider";

const GENRE_OPTIONS = [
  "Bollywood",
  "Hollywood",
  "South Indian",
  "Web Series",
  "Action",
  "Comedy",
  "Horror",
  "Cartoons",
];

export function EditProfileModal() {
  const { user, supabase } = useAuth();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [saveHistory, setSaveHistory] = useState(true);
  const [continueWatching, setContinueWatching] = useState(true);
  const [recommendationsEnabled, setRecommendationsEnabled] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase || !user) return;
    void (async () => {
      const { data, error } = await supabase.from("profiles").select("full_name, username, phone, favorite_genres, save_history, continue_watching, recommendations_enabled, avatar_url").eq("id", user.id).maybeSingle();
      if (error) return;
      if (!data) return;
      setFullName(data.full_name ?? "");
      setUsername(data.username ?? "");
      setPhone(data.phone ?? "");
      setFavoriteGenres(data.favorite_genres ?? []);
      setSaveHistory(Boolean(data.save_history));
      setContinueWatching(Boolean(data.continue_watching));
      setRecommendationsEnabled(Boolean(data.recommendations_enabled));
      setAvatarPreview(data.avatar_url ?? null);
    })();
  }, [supabase, user]);

  const onFileChange = (f: File | null) => {
    if (!f) {
      setAvatarFile(null);
      setAvatarPreview(null);
      return;
    }
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(f.type)) {
      setMessage("Only JPG, PNG or WebP images are allowed.");
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      setMessage("Image must be 2MB or smaller.");
      return;
    }
    setMessage(null);
    setAvatarFile(f);
    setAvatarPreview(URL.createObjectURL(f));
  };

  const toggleGenre = (genre: string) => {
    setFavoriteGenres((current) =>
      current.includes(genre) ? current.filter((g) => g !== genre) : [...current, genre]
    );
  };

  const submit = async () => {
    if (!supabase || !user) return;
    if (fullName.trim().length < 2 || fullName.trim().length > 50) {
      setMessage("Full name must be 2-50 characters.");
      return;
    }
    if (username && (username.length < 3 || username.length > 20)) {
      setMessage("Username must be 3-20 characters.");
      return;
    }

    setLoading(true);
    try {
      let avatar_url = avatarPreview;
      if (avatarFile) {
        const path = `avatars/${user.id}-${Date.now()}`;
      const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(path, avatarFile, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: urlData } = await supabase.storage.from("avatars").getPublicUrl(path);
        avatar_url = urlData.publicUrl;
      }

      const payload = {
        id: user.id,
        display_name: fullName,
        full_name: fullName,
        username: username || null,
        phone: phone || null,
        favorite_genres: favoriteGenres,
        save_history: saveHistory,
        continue_watching: continueWatching,
        recommendations_enabled: recommendationsEnabled,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(payload);
      if (error) throw error;

      setMessage("Profile updated successfully.");
      // Optionally refresh the auth user metadata if avatar/fullname live there.
      // Close will be triggered by the caller after submit returns.
    } catch {
    setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mr-2">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information and preferences.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label>Profile Photo</Label>
            <div className="mt-2 flex items-center gap-4">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile preview" className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <div className="h-16 w-16 rounded-full bg-secondary" />
              )}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">JPG/PNG/WebP only, max 2MB.</p>
          </div>

          <div>
            <Label>Full Name</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={50} />
          </div>

          <div>
            <Label>Username</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} maxLength={20} />
            <p className="text-xs text-muted-foreground mt-1">3-20 characters, must be unique.</p>
          </div>

          <div>
            <Label>Email (read-only)</Label>
            <Input value={user?.email ?? ""} readOnly />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div>
            <Label>Favorite Movies Genres</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {GENRE_OPTIONS.map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input type="checkbox" checked={favoriteGenres.includes(g)} onChange={() => toggleGenre(g)} />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label>Account Preferences</Label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={saveHistory} onChange={() => setSaveHistory((s) => !s)} />
                <span>Save Watch History</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={continueWatching} onChange={() => setContinueWatching((s) => !s)} />
                <span>Enable Continue Watching</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={recommendationsEnabled} onChange={() => setRecommendationsEnabled((s) => !s)} />
                <span>Personalized Recommendations</span>
              </label>
            </div>
          </div>

          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>

        <DialogFooter>
          <DialogContent>
            {/* nothing here; keep dialog children structure stable */}
          </DialogContent>
          <div className="flex gap-2">
            <button className="btn-ghost" type="button" data-slot="dialog-close">Cancel</button>
            <Button onClick={async () => {
              try {
                await submit();
                // close the dialog by clicking the built-in close element if present
                const closeEl = document.querySelector('[data-slot="dialog-close"]') as HTMLElement | null;
                if (closeEl) closeEl.click();
            } catch {
                // noop
              }
            }} disabled={loading}>{loading ? "Saving..." : "Save changes"}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
