import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Content({ headerHeight }: { headerHeight: string }) {
  return (
    <Container maxWidth={false} sx={{ minHeight: `calc(100svh - ${headerHeight})` }}>
      <Box sx={{ px: 4 }}>
        <Outlet />
      </Box>
    </Container>
  );
}
