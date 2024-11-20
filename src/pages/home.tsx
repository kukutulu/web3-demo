import { Button } from '@mui/material';
import LanguagesMenu from 'src/components/menu/languages-menu';
import Modal1 from 'src/components/modal/modal-1';
import Modal2 from 'src/components/modal/modal-2';
import { useModalStateFunction } from 'src/jotai/modal/modal-state';

export default function Home() {
  const { openModal } = useModalStateFunction();

  return (
    <div style={{ height: '100vh' }}>
      <h1>Home</h1>
      <Button onClick={() => openModal('modal1')}>Open Modal 1</Button>
      <Button onClick={() => openModal('modal2')}>Open Modal 2</Button>
      <LanguagesMenu />
      <Modal1 />
      <Modal2 />
    </div>
  );
}
