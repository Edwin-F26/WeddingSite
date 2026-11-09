import { useState } from 'react';
import { supabase, supabaseConfigured } from '../lib/supabase';
import { Rule } from './Ornaments';

const EMPTY = {
  name: '',
  email: '',
  attending: '',
  guests: '1',
  dietary: '',
  message: '',
};

/**
 * RSVP form that writes one row to the Supabase `rsvps` table.
 * Status: idle -> submitting -> done | error.
 */
export default function RsvpForm({ onDone }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  if (!supabaseConfigured) return null;

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const attending = form.attending === 'yes';

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setError('');

    const { error: err } = await supabase.from('rsvps').insert({
      name: form.name.trim(),
      email: form.email.trim() || null,
      attending,
      guests: attending ? Number(form.guests) : 1,
      dietary: attending ? form.dietary.trim() || null : null,
      message: form.message.trim() || null,
    });

    if (err) {
      console.error('RSVP insert failed', err);
      setStatus('error');
      // PGRST205 = table missing from PostgREST's schema cache (not created yet).
      setError(
        err.code === 'PGRST205' || err.code === '42P01'
          ? 'The RSVP table has not been created yet.'
          : 'Something went wrong sending your response. Please try again.',
      );
      return;
    }

    setStatus('done');
    onDone?.();
  };

  if (status === 'done') {
    return (
      <div className="rsvp-form rsvp-form--done" role="status">
        <p className="rsvp-form__thanks">Thank you, {form.name.trim().split(' ')[0]}!</p>
        <Rule />
        <p className="rsvp-form__sub">
          {attending
            ? 'We can\u2019t wait to celebrate with you.'
            : 'We\u2019ll miss you, and we appreciate you letting us know.'}
        </p>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={submit} noValidate={false}>
      <div className="field">
        <label htmlFor="rsvp-name">Full name</label>
        <input
          id="rsvp-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={120}
          value={form.name}
          onChange={update}
        />
      </div>

      <div className="field">
        <label htmlFor="rsvp-email">
          Email <span className="field__opt">(optional)</span>
        </label>
        <input
          id="rsvp-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          value={form.email}
          onChange={update}
        />
      </div>

      <fieldset className="field field--choice">
        <legend>Will you be joining us?</legend>
        <label className={`choice ${form.attending === 'yes' ? 'is-selected' : ''}`}>
          <input
            type="radio"
            name="attending"
            value="yes"
            required
            checked={form.attending === 'yes'}
            onChange={update}
          />
          Joyfully accept
        </label>
        <label className={`choice ${form.attending === 'no' ? 'is-selected' : ''}`}>
          <input
            type="radio"
            name="attending"
            value="no"
            checked={form.attending === 'no'}
            onChange={update}
          />
          Regretfully decline
        </label>
      </fieldset>

      {attending && (
        <>
          <div className="field">
            <label htmlFor="rsvp-guests">Number of guests (including you)</label>
            <select id="rsvp-guests" name="guests" value={form.guests} onChange={update}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="rsvp-dietary">
              Dietary needs <span className="field__opt">(optional)</span>
            </label>
            <input
              id="rsvp-dietary"
              name="dietary"
              type="text"
              maxLength={500}
              value={form.dietary}
              onChange={update}
            />
          </div>
        </>
      )}

      <div className="field">
        <label htmlFor="rsvp-message">
          A note for the couple <span className="field__opt">(optional)</span>
        </label>
        <textarea
          id="rsvp-message"
          name="message"
          rows={3}
          maxLength={1000}
          value={form.message}
          onChange={update}
        />
      </div>

      {status === 'error' && (
        <p className="rsvp-form__error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn--wine" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending\u2026' : 'Send RSVP'}
      </button>
    </form>
  );
}
