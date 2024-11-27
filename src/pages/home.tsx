import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Hover from 'src/animation/hover';
import ReadContract from 'src/components/contract/read-contract';
import ReadContractEthers from 'src/components/contract/read-contract-ethers';
import LanguagesMenu from 'src/components/menu/languages-menu';
import Modal1 from 'src/components/modal/modal-1';
import Modal2 from 'src/components/modal/modal-2';
import { useModalStateFunction } from 'src/jotai/modal/modal-state';

export default function Home() {
  const { openModal } = useModalStateFunction();
  const { t } = useTranslation();

  return (
    <div style={{ height: '100vh' }}>
      <h1>{t('homeTitle')}</h1>
      <Button onClick={() => openModal('modal1')}>Open Modal 1</Button>
      <Button onClick={() => openModal('modal2')}>Open Modal 2</Button>
      <LanguagesMenu />
      <Hover />
      <Modal1 />
      <Modal2 />
      {/* <ReadContract /> */}
      <ReadContractEthers />
    </div>
  );
}
