import { StatusBar } from "expo-status-bar";
import { Header } from "../../components/Header";
import { Container, Content, Traco, DateScheduling, Traco2 } from "./styles";
import { SelectionBoat } from "../../components/SelecionBoat";
import { ClientCard } from "../../components/ClientCard";
import { ActivityIndicator, SectionList, View } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { GetAppointmentsProps, GetBoatProps, GetBoatPropsSelection, GetBoatSelection } from "../../@types/interfaces/types";
import { api } from "../../service/api";
import { Text } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { addDays, format } from "date-fns";
import { Loading } from "../../components/Loading";
import { SelectionBoatList } from "../../components/SelecionBoatList";

interface Item {
    id: string;
    client_name: string;
    turn: string;
    date: string;
    speedboat_id: string;
}

interface SectionData {
    title: string;
    data: Item[];
    month: number;
}

export function SchedulingList() {

    const navigation = useNavigation<any>();

    const [openSelectBoat, setOpenSelectBoat] = useState(false);
    const [boat, setBoat] = useState<GetBoatPropsSelection>({} as GetBoatPropsSelection);
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState<GetAppointmentsProps[]>([]);
    const [dataAppointments, setDataAppointments] = useState<SectionData[]>([]);

    const isFocused = useIsFocused();

    const extractMonth = (dateString: string): number => {
        const date = new Date(dateString);
        return date.getMonth() + 1;
    };

    const isDateInTheFuture = (dateString: string): boolean => {
        const itemDate = format(addDays(new Date(dateString), 1), 'yyyy-MM-dd');
        const currentDate = format(new Date(), 'yyyy-MM-dd');

        return itemDate >= currentDate;
    };

    const organizeData = (rawData: Item[]): SectionData[] => {
        const sectionsMap: { [key: string]: { data: Item[], month: number } } = {};

        const filteredData = rawData.filter((item) => isDateInTheFuture(item.date));

        filteredData.forEach((item) => {
            const sectionKey = item.date;
            const month = extractMonth(item.date);

            if (!sectionsMap[sectionKey]) {
                sectionsMap[sectionKey] = { data: [], month }
            }

            sectionsMap[sectionKey].data.push(item)
        })

        const formattedSections = Object.keys(sectionsMap).map((key) => ({
            title: key,
            data: sectionsMap[key].data,
            month: sectionsMap[key].month
        }))

        return formattedSections.sort((a, b) => a.month - b.month);
    }

    const loadAppointments = async () => {
        setLoading(true);
        await api.get(``).then((response) => {
            setAppointments(response.data)
            const rawData: Item[] = response.data;
            const formatedData = organizeData(rawData);
            setDataAppointments(formatedData);
        }).catch(error => console.log(error)).finally(() => setLoading(false))
    }

    useEffect(() => {
        loadAppointments();
    }, [isFocused])

    const appointmentsFilter = useMemo(() => {
        return dataAppointments.map((item) => ({ ...item, data: item.data.filter((item) => item.speedboat_id === boat.id) }))
    }, [boat, dataAppointments])

    return (
        <Container>
            <StatusBar style="light" />
            <Header nameScreen="Próximos passeios" />
            <Content>
                {
                    loading ?
                        <Loading />
                        :
                        <>
                            <Traco />
                            <SelectionBoatList onPress={() => setOpenSelectBoat(true)} open={openSelectBoat} setOpen={setOpenSelectBoat} setBoatSelected={setBoat} boatSelected={boat} />
                            <Traco2 />
                            
                                <SectionList
                                    sections={appointmentsFilter}
                                    keyExtractor={(item) => item.id}
                                    stickySectionHeadersEnabled={false}
                                    renderItem={({ item, index }) => <ClientCard id={`${index + 1}`} onPress={() => navigation.navigate('SchedulingDetails', { paramKey: item.id })} name={item.client_name} time={item.turn === "MORNING" ? 'Manhã' : (item.turn === "AFTERNOON" ? 'Tarde' : 'Dia inteiro')} />}
                                    renderSectionHeader={({ section: { title, data } }) => {
                                        const titleReverse = title.split('-')
                                        if (data.length !== 0) {
                                            return (
                                                <DateScheduling>{`${titleReverse[2]}/${titleReverse[1]}/${titleReverse[0]}`}</DateScheduling>
                                            )
                                        } else {
                                            return <View></View>
                                        }
                                    }}
                                    scrollEnabled
                                    showsVerticalScrollIndicator={false}
                                />
                            
                        </>
                }
            </Content>
        </Container>
    )
}