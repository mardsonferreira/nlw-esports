import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
    View,
    Modal,
    ModalProps,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { CheckCircle } from "phosphor-react-native";
import * as Clipboard from "expo-clipboard";

import { Heading } from "../Heading";

import { THEME } from "../../theme";

import { styles } from "./styles";

interface DuoMatchProps extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
    const [isCopying, setIsCopying] = useState(false);

    async function handleCopyDiscordToClipboard() {
        setIsCopying(true);
        await Clipboard.setStringAsync(discord);

        Alert.alert(
            "Discord Cópiado!",
            "Discord copiado para sua área de transferência"
        );
        setIsCopying(false);
    }

    return (
        <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />

                    <Heading
                        title="Let's play"
                        subtitle="Agora é só começar a jogar!"
                        style={{ alignItems: "center", marginTop: 24 }}
                    />

                    <Text style={styles.label}>Adicione no Discord</Text>

                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscordToClipboard}
                        disabled={isCopying}
                    >
                        <Text style={styles.discord}>
                            {isCopying ? (
                                <ActivityIndicator
                                    color={THEME.COLORS.PRIMARY}
                                />
                            ) : (
                                discord
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
