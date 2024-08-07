import { styled } from '@mui/material/styles';
import Splitscreen from '@mui/icons-material/Splitscreen';
import Storage from '@mui/icons-material/Storage';
import Logout from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

const LogoImg = styled('img')({
  position: 'absolute',
  top: '10px',
  left: '10px',
  width: '200px',
  height: '70px',
  backgroundColor: 'black',
  border: '1px solid gray',
  zIndex: '1000'
});

const SelectPlaceName = styled('div')({
  position: 'absolute',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  top: '30px',
  left: '350px',
  width: '500px',
  height: 'auto',
  backgroundColor: 'white',
  border: '1px solid gray',
  borderRadius: '20px',
  padding: '0px 20px',
  zIndex: 1000,
});

const CloseButton = styled(CloseIcon)({
  cursor: 'pointer',
  marginRight: '10px',
});

const SelectedText = styled('p')({
  backgroundColor: '#f0f0f0',
  fontSize: '14px',
  borderRadius: '20px',
  padding: '5px 10px',
  margin: '5px',
});

const SelectButton = styled(Button)({
  padding: '3px 0',
  border: '1px solid #1188bb',
  backgroundColor: '#1188bb',
  color: 'white',
  fontSize: '14px',
  borderRadius: '5px',
  marginLeft: 'auto',
  '&:hover': {
    backgroundColor: '#1188dd',
  },
});

const SearchContents = styled('div')({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  top: '20px',
  right: '40px',
  width: 'auto',
  zIndex: '1000',
});

const SearchButton = styled(Button)({
  borderRadius: '5px',
  backgroundColor: 'white',
  border: '1px solid gray',
  margin: '10px',
  padding: '5px 10px',
  fontSize: '12px',
  '&:hover': {
    backgroundColor: 'white',
    borderColor: 'darkgray',
  },
});

const FutureSearchButton = styled(Button)({
  borderRadius: '5px',
  backgroundColor: 'white',
  border: '1px solid gray',
  margin: '10px',
  padding: '5px 10px',
  fontSize: '12px',
  '&:hover': {
    backgroundColor: 'white',
    borderColor: 'darkgray',
  },
});

const IconContents = styled('div')({
  position: 'absolute',
  bottom: '50px',
  right: '10px',
  width: '90px',
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '10px',
  border: '1px solid gray',
  zIndex: '1000',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const IconWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

const Popup = styled('div')({
  display: 'none',
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '5px 10px',
  backgroundColor: 'gray',
  color: 'white',
  borderRadius: '3px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: '5px',
    borderStyle: 'solid',
    borderColor: 'gray transparent transparent transparent',
  },
});

const SplitscreenIcon = styled(Splitscreen)({
  '&:hover + .popup': {
    display: 'block',
  }
});

const StorageIcon = styled(Storage)({
  '&:hover + .popup': {
    display: 'block',
  }
});

const LogoutIcon = styled(Logout)({
  '&:hover + .popup': {
    display: 'block',
  }
});

export {
  LogoImg,
  SelectPlaceName,
  CloseButton,
  SelectedText,
  SelectButton,
  SearchContents,
  SearchButton,
  FutureSearchButton,
  IconContents,
  IconWrapper,
  Popup,
  SplitscreenIcon,
  StorageIcon,
  LogoutIcon,
};
