# Setup-Anleitung — Haushalthelfer-Projekt

Diese Anleitung beschreibt, was jedes Teammitglied einrichten muss, um am
Projekt mitarbeiten zu können.

> **Wichtig:** Die VM ist gemeinsam und bereits eingerichtet (nginx, Node.js,
> Git). Sie muss **nicht** von jedem neu installiert werden. Jedes Teammitglied
> richtet aber **auf dem eigenen PC** die Entwicklungswerkzeuge ein.

---

## A) Auf dem eigenen PC installieren

1. **Git** — von <https://git-scm.com/downloads> herunterladen und installieren.
2. **Node.js 22 LTS** — von <https://nodejs.org> die **LTS**-Version installieren.
3. **VS Code** (Editor) — von <https://code.visualstudio.com>.

Installation prüfen (in PowerShell bzw. Terminal):

```
git --version
node -v
npm -v
```

---

## B) GitHub einrichten

4. **GitHub-Account** erstellen (falls noch keiner vorhanden ist) und die
   **Einladung zum Repository annehmen** (Link in der E-Mail oder unter
   <https://github.com/notifications>).

5. **Git-Identität** setzen:

   ```
   git config --global user.name "Vorname Nachname"
   git config --global user.email "eure@email.de"
   ```

6. **SSH-Key** erzeugen:

   ```
   ssh-keygen -t ed25519 -C "github"
   ```

   Bei allen Fragen einfach **Enter** drücken. Danach den **öffentlichen**
   Schlüssel anzeigen:

   ```
   cat ~/.ssh/id_ed25519.pub
   ```

   Die ausgegebene Zeile kopieren und bei GitHub hinterlegen unter:
   **Settings → SSH and GPG keys → New SSH key**.

---

## C) Projekt klonen

7. Repository auf den eigenen PC holen:

   ```
   git clone git@github.com:NataliaYakushkina/Softwareproject.git
   ```

---

## D) VM-Zugang (gemeinsames Konto)

8. Mit dem **HSHL-VPN** verbinden.

9. Per SSH einloggen (gemeinsames Passwort vom Team):

   ```
   ssh cvd-g@10.72.100.38
   ```

| Angabe              | Wert                              |
| ------------------- | --------------------------------- |
| IP (intern / VPN)   | `10.72.100.38`                    |
| Domain (extern)     | <https://cvd-g.studlp2.hshl.de>   |
| Benutzername        | `cvd-g`                           |
| Ports               | 22 (SSH/SFTP), 80 (HTTP), 443 (HTTPS) |

> **Hinweis:** Es gibt nur **ein** VM-Konto (`cvd-g`) — alle nutzen denselben
> Benutzernamen und dasselbe Passwort.

---

## Technologie-Stack des Projekts

- **Frontend:** React, Vite, JavaScript
- **Backend:** Node.js
- **Datenbank:** SQLite
- **Kommunikation:** HTTP/JSON, REST API
