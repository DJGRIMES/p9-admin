import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFount, getSpellbook } from "../api/fount";
import { fetchPreferences } from "../api/pref";
import { fetchProfile } from "../api/prof";
import type { Fount, Pref, Prof, SpellbookEntry } from "../types/p9";
import { ApiError } from "../api/client";

interface LoadingState {
  fount: boolean;
  profile: boolean;
  pref: boolean;
  spellbook: boolean;
}

const FountDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fount, setFount] = useState<Fount | null>(null);
  const [profile, setProfile] = useState<Prof | null>(null);
  const [preferences, setPreferences] = useState<Pref | null>(null);
  const [spellbook, setSpellbook] = useState<SpellbookEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingState>(
    () => ({ fount: true, profile: false, pref: false, spellbook: false })
  );

  useEffect(() => {
    if (!id) return;
    const fountId = id;

    async function loadFountDetails() {
      try {
        const response = await getFount(fountId);
        setFount(response.fount);
        setLoading((prev) => ({ ...prev, fount: false }));

        setLoading((prev) => ({ ...prev, profile: true }));
        fetchProfile(response.fount.id)
          .then((profResp) => setProfile(profResp.profile))
          .catch((err) => setError((err as ApiError).message))
          .finally(() => setLoading((prev) => ({ ...prev, profile: false })));

        setLoading((prev) => ({ ...prev, pref: true }));
        fetchPreferences(response.fount.id)
          .then((prefResp) => setPreferences(prefResp.pref))
          .catch((err) => setError((err as ApiError).message))
          .finally(() => setLoading((prev) => ({ ...prev, pref: false })));

        if (response.fount.public_key) {
          setLoading((prev) => ({ ...prev, spellbook: true }));
          getSpellbook(response.fount.public_key)
            .then((spellResp) => setSpellbook(spellResp.spellbook))
            .catch((err) => setError((err as ApiError).message))
            .finally(() => setLoading((prev) => ({ ...prev, spellbook: false })));
        }
      } catch (err) {
        const apiErr = err as ApiError;
        setError(apiErr.message || "Unable to resolve fount spell.");
        setLoading({ fount: false, profile: false, pref: false, spellbook: false });
      }
    }

    void loadFountDetails();
  }, [id]);

  return (
    <div>
      <h2>Fount Detail</h2>
      {error ? <p style={{ color: "#b00020" }}>Error: {error}</p> : null}
      {loading.fount ? <p>Loading fount...</p> : null}

      {fount ? (
        <div style={{ marginBottom: "1.5rem" }}>
          <p><strong>Fount ID:</strong> {fount.id}</p>
          <p><strong>Public key:</strong> {fount.public_key}</p>
          <p><strong>State:</strong> {fount.state}</p>
          {fount.metadata ? (
            <pre style={{ background: "#f9fafb", padding: "0.75rem" }}>
              {JSON.stringify(fount.metadata, null, 2)}
            </pre>
          ) : null}
        </div>
      ) : null}

      <section style={{ marginBottom: "1.25rem" }}>
        <h3>Spellbook</h3>
        {loading.spellbook ? <p>Loading spellbook...</p> : null}
        {!loading.spellbook && spellbook.length === 0 ? <p>No spells recorded for this fount.</p> : null}
        {spellbook.length > 0 ? (
          <ul style={{ paddingLeft: "1rem" }}>
            {spellbook.map((entry) => (
              <li key={`${entry.spell}-${entry.last_used_at ?? "never"}`}>
                <strong>{entry.spell}</strong>
                {entry.mp_cost !== undefined ? ` (mp: ${entry.mp_cost})` : ""}
                {entry.description ? ` — ${entry.description}` : ""}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section style={{ marginBottom: "1.25rem" }}>
        <h3>Profile (Prof)</h3>
        {loading.profile ? <p>Loading profile spell...</p> : null}
        {profile ? (
          <pre style={{ background: "#f9fafb", padding: "0.75rem" }}>
            {JSON.stringify(profile.profile, null, 2)}
          </pre>
        ) : !loading.profile ? (
          <p>No profile returned from Prof spell.</p>
        ) : null}
      </section>

      <section style={{ marginBottom: "1.25rem" }}>
        <h3>Settings (Pref)</h3>
        {loading.pref ? <p>Loading preferences spell...</p> : null}
        {preferences ? (
          <pre style={{ background: "#f9fafb", padding: "0.75rem" }}>
            {JSON.stringify(preferences.settings, null, 2)}
          </pre>
        ) : !loading.pref ? (
          <p>No preferences returned from Pref spell.</p>
        ) : null}
      </section>

      <section>
        <h3>Related Data</h3>
        <p>
          Invites minted or claimed by this fount and receipts owned by this fount are available in their
          respective spell-driven views.{" "}
          <Link to="/invites">Go to Invites</Link> or <Link to="/receipts">Go to Receipts</Link>.
        </p>
      </section>
    </div>
  );
};

export default FountDetail;
