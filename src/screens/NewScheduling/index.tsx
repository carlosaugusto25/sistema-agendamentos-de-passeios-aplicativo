import { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Container,
  HeaderScreen,
  ButtonBack,
  IconBack,
  TitleScreen,
  ViewComplementation,
  Content,
  CheckBox,
  CheckAndOption,
  IconCheck,
  TextOption,
  ButtonsOptions,
  ButtonAction,
  TextCancel,
  TextConfirm,
} from './styles';
import { SelectionBoat } from '../../components/SelecionBoat';
import { InputAndIconBlue } from '../../components/InputAndIconBlue';
import theme from '../../theme';
import { ModalConfirmation } from '../../components/ModalConfirmation';
import {
  AdditionalProps,
  GetAppointmentsProps,
  GetBoatProps,
  GetBoatPropsSelection,
} from '../../@types/interfaces/types';
import { addDays, format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../service/api';
import { Alert, View } from 'react-native';
import { SelectionTurn } from '../../components/SelecionTurn';
import { SelectionCondionalPayment } from '../../components/SelecionConditionalPayment';
import { maskCpf, maskCurrency } from '../../utils/masks';
import { InputAndIconBlueMask } from '../../components/InputAndIconBlueMask';
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';

interface RouteNovoAgendamentoProps {
  route?: {
    key: string;
    name: string;
    params: {
      paramKey: string;
    };
    path: undefined;
  };
}

export function NewScheduling({ route }: any) {
  const navigation = useNavigation<any>();

  const [openSelectBoat, setOpenSelectBoat] = useState(false);
  const [boat, setBoat] = useState<GetBoatPropsSelection>(
    {} as GetBoatPropsSelection
  );
  const [appointments, setAppointments] = useState<GetAppointmentsProps[]>([]);
  const [boats, setBoats] = useState<GetBoatPropsSelection[]>([]);

  const [openPayment, setOpenPayment] = useState(false);
  const [openTurn, setOpenTurn] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState('');
  const [passengers, setPassengers] = useState('');
  const [paid, setPaid] = useState('');
  const [date, setDate] = useState(
    route.params?.paramKey ? route.params?.paramKey : ''
  );
  const [payment, setPayment] = useState<'PIX' | 'MONEY' | 'CREDCARD'>();
  const [turn, setTurn] = useState<'MORNING' | 'AFTERNOON' | 'DAY'>();

  const [aditionals, setAditionals] = useState<AdditionalProps[]>([]);
  const [aditionalSelected, setAditionalSelected] = useState<string[]>([]);

  const loadAditionals = useCallback(async () => {
    await api
      .get('')
      .then((response) => {
        setAditionals(response.data);
      })
      .catch((error) => console.log('Erro Menu', error));
  }, []);

  const loadSchedulings = useCallback(async () => {
    await api
      .get('')
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((erro) => console.log('Erro appointments', erro));
  }, []);

  const loadBoat = useCallback(async () => {
    await api
      .get('')
      .then((res) => {
        setBoats(res.data);
      })
      .catch((erro) => console.log('Erro boat', erro));
  }, []);

  useEffect(() => {
    loadAditionals();
    loadSchedulings();
    loadBoat();
  }, []);

  const addAditional = useCallback(
    (value: string) => {
      if (aditionalSelected.includes(value)) {
        setAditionalSelected(
          aditionalSelected.filter((item) => item !== value)
        );
      } else {
        setAditionalSelected([...aditionalSelected, value]);
      }
    },
    [aditionalSelected]
  );

  const valueTotal = useMemo(() => {
    let total = Number(value) * 100;
    aditionals.map((item) => {
      if (aditionalSelected.includes(item.id)) {
        total += Number(item.value);
      }
    });
    return total;
  }, [value, aditionalSelected, aditionals]);

  const handleSubmitNewAppointment = useCallback(async () => {
    let maxPeopleBoat = false;
    let unavailableBoat = false;
    let unavailableDayBoat = false;

    if (
      date === '' ||
      name === '' ||
      value === '' ||
      passengers === '' ||
      phone === '' ||
      turn === undefined ||
      payment === undefined ||
      boat.id === ''
    ) {
      return Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: 'Preencha todos os campos.',
      });
    }

    appointments.map((item) => {
      if (
        item.date === date &&
        turn === item.turn &&
        item.speedboat_id === boat.id
      ) {
        return (unavailableBoat = true);
      } else if (
        item.date === date &&
        item.turn === 'DAY' &&
        item.speedboat_id === boat.id
      ) {
        return (unavailableDayBoat = true);
      }
    });

    if (unavailableDayBoat) {
      return Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: 'Dia indisponível nesta lancha para esta data.',
      });
    }

    if (unavailableBoat) {
      return Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: 'Horário indisponível nesta lancha para esta data.',
      });
    }

    boats.map((bt) => {
      if (bt.id === boat.id && Number(passengers) > bt.max_people) {
        return (maxPeopleBoat = true);
      }
    });

    if (maxPeopleBoat) {
      return Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: 'Capacidade da lancha excedida.',
      });
    }

    const obj = {
      date: date,
      turn: turn,
      people_quantity: Number(passengers),
      client_email: email,
      client_name: name,
      client_phone: phone,
      client_document: cpf,
      payment_type: payment,
      value: Number(paid) * 100,
      total_value: valueTotal,
      speedboat_id: boat.id,
      additionals: aditionalSelected,
    };

    await api
      .post('', obj)
      .then((response) => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Sucesso',
          textBody: 'Agendamento criado com sucesso',
        });
        navigation.navigate('Calendário');
        setOpenModal(false);
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erro',
          textBody: 'Erro ao criar agendamento',
        });
      });
  }, [
    appointments,
    boats,
    route,
    boat,
    name,
    cpf,
    value,
    passengers,
    paid,
    date,
    aditionalSelected,
    phone,
    email,
    turn,
    payment,
    aditionals,
    valueTotal,
  ]);

  return (
    <>
      <Container>
        <StatusBar translucent style='dark' />
        <HeaderScreen>
          <ButtonBack onPress={() => navigation.goBack()}>
            <IconBack name='arrow-left' />
          </ButtonBack>
          <TitleScreen>Novo Agendamento</TitleScreen>
          <ViewComplementation />
        </HeaderScreen>
        <Content showsVerticalScrollIndicator={false}>
          <SelectionBoat
            onPress={() => setOpenSelectBoat(true)}
            open={openSelectBoat}
            setOpen={setOpenSelectBoat}
            setBoatSelected={setBoat}
          />
          <InputAndIconBlue
            value={name}
            onChangeText={setName}
            placeHolder='Nome'
            icon
            nameIcon='user-alt'
            marginBotton={5}
          />
          <InputAndIconBlueMask
            type='cpf'
            value={cpf}
            onChangeText={(e) => setCpf(e.replace(/\D/g, ''))}
            placeHolder='CPF'
            icon
            nameIcon='address-card'
            marginTop={5}
            marginBotton={5}
            keyboardType='numeric'
          />
          <InputAndIconBlue
            value={email}
            autoCapitalize='none'
            onChangeText={setEmail}
            placeHolder='E-mail'
            icon
            nameIcon='envelope'
            marginTop={5}
            marginBotton={5}
            keyboardType='email-address'
          />
          <InputAndIconBlueMask
            type='cel-phone'
            options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
            value={phone}
            onChangeText={(e) => setPhone(e.replace(/\D/g, ''))}
            placeHolder='Contato'
            icon
            nameIcon='phone-alt'
            marginTop={5}
            marginBotton={5}
            keyboardType='numeric'
          />
          <SelectionTurn
            onPress={() => setOpenTurn(true)}
            open={openTurn}
            setOpen={setOpenTurn}
            turn={turn}
            setTurn={setTurn}
          />
          <InputAndIconBlue
            value={value}
            onChangeText={setValue}
            placeHolder='Valor'
            icon
            nameIcon='dollar-sign'
            marginTop={5}
            marginBotton={5}
            keyboardType='numeric'
          />
          <SelectionCondionalPayment
            onPress={() => setOpenPayment(true)}
            open={openPayment}
            setOpen={setOpenPayment}
            conditionalPaymentSelected={payment}
            setConditionalPaymentSelected={setPayment}
          />
          <InputAndIconBlue
            value={passengers}
            onChangeText={setPassengers}
            placeHolder='Quantidade de Passageiros'
            icon
            nameIcon='user-friends'
            marginTop={5}
            marginBotton={5}
            keyboardType='numeric'
          />
          <InputAndIconBlue
            value={paid}
            onChangeText={setPaid}
            placeHolder='Valor pago na reserva'
            icon
            nameIcon='ticket-alt'
            marginTop={5}
            marginBotton={5}
            keyboardType='numeric'
          />
          <InputAndIconBlue
            editable={false}
            value={format(addDays(new Date(date), 1), 'dd/MM/yyyy')}
            placeHolder={'Data'}
            icon
            nameIcon='calendar-alt'
            marginTop={5}
          />

          <TitleScreen>Extras</TitleScreen>
          {aditionals.map((aditional, index) => (
            <CheckAndOption marginBotton={5} key={aditional.id}>
              <CheckBox
                onPress={() => addAditional(aditional.id)}
                color={theme.COLORS.CHECKBOX}
              >
                {aditionalSelected.includes(aditional.id) && (
                  <IconCheck
                    key={aditional.id}
                    fontSize={20}
                    width={20}
                    name='check'
                  />
                )}
              </CheckBox>
              <TextOption>
                {aditional.name} /{' '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(aditional.value / 100)}
              </TextOption>
            </CheckAndOption>
          ))}
          <View
            style={{
              width: '100%',
              height: 30,
              backgroundColor: 'transparent',
            }}
          />
        </Content>
      </Container>
      <ButtonsOptions>
        <ButtonAction borderRight onPress={() => navigation.goBack()}>
          <TextCancel>Cancelar</TextCancel>
        </ButtonAction>
        <ButtonAction onPress={() => setOpenModal(true)}>
          <TextConfirm>CRIAR RESERVA</TextConfirm>
        </ButtonAction>
      </ButtonsOptions>
      <ModalConfirmation
        open={openModal}
        setOpen={setOpenModal}
        boat={boat}
        name={name}
        cpf={cpf}
        value={value}
        passengers={passengers}
        paid={paid}
        date={date}
        aditionalSelected={aditionalSelected}
        aditionals={aditionals}
        email={email}
        phone={phone}
        totalValue={valueTotal}
        turn={turn}
        payment={payment}
        onPress={handleSubmitNewAppointment}
      />
    </>
  );
}
