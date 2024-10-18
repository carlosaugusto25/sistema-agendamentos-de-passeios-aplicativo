import { useCallback, useEffect, useState } from 'react';
import {
  Container,
  ContentIcon,
  Icon,
  Content,
  NameBoat,
  IconSelection,
  ContentModal,
  ViewModal,
  ContentClose,
  CloseButton,
  ViewButton,
  TitleModal,
  NameBoatSelect,
  TextBoatSelect,
} from './styles';
import {
  GetBoatProps,
  GetBoatPropsSelection,
  GetBoatSelection,
} from '../../@types/interfaces/types';
import { api } from '../../service/api';
import { Modal } from 'react-native';
import { ButtonModal } from '../ButtonModal';
import theme from '../../theme';
import { TouchableOpacityProps } from 'react-native-gesture-handler';
import { useAuth } from '../../context/auth';

interface SelectionBoatProps extends TouchableOpacityProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setBoatSelected: (boatSelected: GetBoatPropsSelection) => void;
  boatSelected?: GetBoatPropsSelection;
}

export function SelectionBoatList({
  open,
  setOpen,
  setBoatSelected,
  boatSelected,
  ...rest
}: SelectionBoatProps) {
  const { token } = useAuth();
  const [boats, setBoats] = useState<GetBoatPropsSelection[]>([]);
  const [boat, setBoat] = useState<GetBoatPropsSelection>(
    {} as GetBoatPropsSelection
  );
  const getBoat = useCallback(async () => {
    await api
      .get('', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBoats(response.data);
        setBoat(response.data[0]);
        setBoatSelected(response.data[0]);
      })
      .catch((error) => console.log(JSON.stringify(error, null, 2)));
  }, []);

  useEffect(() => {
    if (token !== undefined || token !== '') {
      getBoat();
    }
  }, [token]);

  return (
    <Container {...rest}>
      <ContentIcon>
        <Icon name='ship' />
      </ContentIcon>
      <Content>
        <NameBoat>{boatSelected?.name}</NameBoat>
        <IconSelection name='caret-down' />
      </Content>

      <Modal
        statusBarTranslucent
        animationType='slide'
        transparent
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        <ContentModal
          onPress={() => {
            setOpen(false);
          }}
        >
          <ViewModal
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <ContentClose>
              <CloseButton
                onPress={() => {
                  setOpen(false);
                }}
              >
                <ViewButton />
              </CloseButton>
            </ContentClose>
            <TitleModal>Selecione a lancha</TitleModal>
            {boats?.map((boat) => (
              <NameBoatSelect
                key={boat.id}
                onPress={() => {
                  setBoat(boat);
                  setBoatSelected(boat);
                  setOpen(false);
                }}
              >
                <TextBoatSelect>{boat.name}</TextBoatSelect>
              </NameBoatSelect>
            ))}
          </ViewModal>
        </ContentModal>
      </Modal>
    </Container>
  );
}
