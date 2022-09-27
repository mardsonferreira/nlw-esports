import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo-nlw-esports.png";

import { GameParams } from "../../@types/navigation";

import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

import { THEME } from "../../theme";

import { styles } from "./styles";

export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);

    const route = useRoute();
    const navitation = useNavigation();

    const game = route.params as GameParams;

    function handleGoBack() {
        navitation.goBack();
    }

    useEffect(() => {
        fetch(`http://192.168.1.69:3333/games/${game.id}/ads`)
            .then((response) => response.json())
            .then((data) => setDuos(data));
    }, []);

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image source={logoImg} style={styles.logo} />

                    <View style={styles.right} />
                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />

                <FlatList
                    data={duos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <DuoCard data={item} onConnect={() => {}} />
                    )}
                    horizontal
                    contentContainerStyle={[
                        duos.length > 0
                            ? styles.contentList
                            : styles.emptyListContent,
                    ]}
                    style={styles.containerList}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios publicados ainda.
                        </Text>
                    )}
                />
            </SafeAreaView>
        </Background>
    );
}
