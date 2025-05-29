import React from 'react';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <div className="footer-column">
          <h3>COMPANY</h3>
          <ul>
            <li><a href="https://www.last.fm/about">About Last.fm</a></li>
            <li><a href="https://www.last.fm/about/contact">Contact Us</a></li>
            <li><a href="https://www.last.fm/about/jobs">Jobs</a></li>
            <li><a href="https://www.last.fm/features">Features</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>HELP</h3>
          <ul>
            <li><a href="https://www.last.fm/about/trackmymusic">Track My Music</a></li>
            <li><a href="https://support.last.fm/" target="_blank" rel="noopener noreferrer">Community Support</a></li>
            <li><a href="https://www.last.fm/help/guidelines">Community Guidelines</a></li>
            <li><a href="https://www.last.fm/help/faq" target="_blank" rel="noopener noreferrer">Help</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>GOODIES</h3>
          <ul>
            <li><a href="https://www.last.fm/about/trackmymusic">Download Scrobbler</a></li>
            <li><a href="https://www.last.fm/api">Developer API</a></li>
            <li><a href="https://www.last.fm/music/+free-music-downloads">Free Music Downloads</a></li>
            <li><a href="https://store.last.fm">Merchandise</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>ACCOUNT</h3>
          <ul>
            <li><a href="https://www.last.fm/inbox">Inbox</a></li>
            <li><a href="https://www.last.fm/settings">Settings</a></li>
            <li><a href="https://www.last.fm/pro">Last.fm Pro</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>FOLLOW US</h3>
          <ul>
            <li><a href="https://www.facebook.com/lastfm">Facebook</a></li>
            <li><a href="https://x.com/lastfm">X</a></li>
            <li><a href="https://bsky.app/profile/last.fm">Bluesky</a></li>
            <li><a href="https://www.instagram.com/last_fm">Instagram</a></li>
            <li><a href="https://www.youtube.com/user/lastfm">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="language-selector">
          <ul>
            <li><strong>English</strong></li>
            <li><a href="#">Deutsch</a></li>
            <li><a href="#">Español</a></li>
            <li><a href="#">Français</a></li>
            <li><a href="#">Italiano</a></li>
            <li><a href="#">日本語</a></li>
            <li><a href="#">Polski</a></li>
            <li><a href="#">Português</a></li>
            <li><a href="#">Русский</a></li>
            <li><a href="#">Svenska</a></li>
            <li><a href="#">Türkçe</a></li>
            <li><a href="#">简体中文</a></li>
          </ul>
        </div>
        <p className="footer-timezone">
          <a href="/">Time zone: <strong>Europe/Moscow</strong></a>
        </p>
        <div className="footer-legal">
          <ul>
            <li><a rel="nofollow" href="http://www.cbsinteractive.com/">CBS Interactive</a> © 2025 <span>Last.fm</span> Ltd. All rights reserved</li>
            <li><a href="https://www.last.fm/legal/terms">Terms of Use</a></li>
            <li><a href="https://www.last.fm/legal/privacy">Privacy Policy</a></li>
            <li><a href="https://www.last.fm/legal">Legal Policies</a></li>
            <li><a href="#">Cookie Details</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://careers.paramount.com/">Jobs at Paramount</a></li>
            <li><a rel="nofollow" href="http://www.last.fm">Last.fm Music</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 