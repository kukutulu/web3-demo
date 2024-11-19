import ButtonConnectWallet from './button/button-connect-wallet';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="path/to/logo.png" alt="App Logo" />
      </div>
      <ButtonConnectWallet />
    </header>
  );
}
