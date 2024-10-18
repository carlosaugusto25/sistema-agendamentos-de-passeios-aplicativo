import { Button, View } from 'react-native';
import { useAuth } from '../../context/auth';
import { Card, Container, Content, Info, Label } from './styles';
import { Header } from '../../components/Header';
import {
  GetAppointmentsProps,
  GetBoatPropsSelection,
} from '../../@types/interfaces/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../../service/api';
import { SelectionBoatList } from '../../components/SelecionBoatList';
import { SelectionMonth } from '../../components/SelecionMonth';
import { SelectionYear } from '../../components/SelecionYear';

export function ConfigPage() {
  const { logout } = useAuth();

  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];
  const years = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];

  const [dateActual, setDateActual] = useState<Date>(new Date());

  const [month, setMonth] = useState(dateActual.getMonth());
  const [year, setYear] = useState(dateActual.getFullYear());
  const [boatSelected, setBoatSelected] = useState<GetBoatPropsSelection>(
    {} as GetBoatPropsSelection
  );
  const [dashAppointmet, setDashAppointmet] = useState<GetAppointmentsProps[]>(
    []
  );

  const [loadingAppointments, setLoadingAppointments] = useState(false);

  const [selectBoat, setSelectBoat] = useState(false);
  const [selectMonth, setSelectMonth] = useState(false);
  const [selectYear, setSelectYear] = useState(false);

  const loadDashAppointments = useCallback(async () => {
    setLoadingAppointments(true);
    await api
      .get('')
      .then((response) => {
        setDashAppointmet(response.data);
      })
      .catch((error) => console.log('Erro config', error))
      .finally(() => setLoadingAppointments(false));
  }, []);

  useEffect(() => {
    loadDashAppointments();
    setDateActual(new Date());
  }, []);

  const quantityAppointments = useMemo(() => {
    return dashAppointmet.filter(
      (appointment) =>
        appointment.speedboat_id === boatSelected.id &&
        Number(appointment.date.split('-')[0]) === year &&
        Number(new Date(appointment.date).getMonth()) === month
    );
  }, [dashAppointmet, boatSelected, month, year]);

  const totalValueAppointments = useMemo(() => {
    let val = 0;
    quantityAppointments.map((appointment) => {
      if (
        appointment.speedboat_id === boatSelected.id &&
        Number(appointment.date.split('-')[0]) === year &&
        Number(new Date(appointment.date).getMonth()) === month
      ) {
        val += appointment.total_value;
      }
    });
    return val;
  }, [quantityAppointments, boatSelected, month, year]);

  return (
    <Container>
      <Header
        nameScreen='Configurações'
        rigthIcon
        rightNameIcon='sign-out-alt'
        onPressRight={logout}
      />
      <Content>
        <SelectionBoatList
          onPress={() => setSelectBoat(true)}
          open={selectBoat}
          setOpen={setSelectBoat}
          setBoatSelected={setBoatSelected}
          boatSelected={boatSelected}
        />
        <SelectionMonth
          onPress={() => setSelectMonth(true)}
          open={selectMonth}
          setOpen={setSelectMonth}
          setMonthSelected={setMonth}
          monthSelected={month}
        />
        <SelectionYear
          onPress={() => setSelectYear(true)}
          open={selectYear}
          setOpen={setSelectYear}
          setYearSelected={setYear}
          yearSelected={year}
        />
        <Card>
          <Label>Total de agendamentos</Label>
          <Info>{quantityAppointments.length}</Info>
        </Card>
        <Card>
          <Label>Faturamento total</Label>
          <Info>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(totalValueAppointments / 100)}
          </Info>
        </Card>
      </Content>
    </Container>
  );
}
