import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather, FontAwesome, FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfileById } from '@/services/api';
import { Profile } from "@/services/types";

const ProfileScreen = () => {
    const router = useRouter();
    const [id, setId] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);


    useEffect(() => {
        const fetchId = async () => {
            try {
                const storedId = await AsyncStorage.getItem("idUser");
                console.log("ID from AsyncStorage:", storedId);
                setId(storedId);
            } catch (error) {
                console.error("Error retrieving idUser:", error);
            }
        };
        fetchId();
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                console.log("Fetching profile with ID:", id);
                const data = await getProfileById(id);
                console.log("Profile data received:", data);
                setProfile(data);
            } catch (error) {
                console.error("Lỗi khi lấy hồ sơ:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!profile) {
        return <Text>Đang tải...</Text>;
    }


    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userId');
            console.log("Đã logout thành công!");
            router.push('/Auths/login');
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        }
    };

    const stats = [
        { label: 'Chờ xác nhận', icon: 'wallet' },
        { label: 'Đang xử lí', icon: 'truck' },
        { label: 'Lịch sử đơn hàng', icon: 'clock' },
        { label: 'Đã hủy', icon: 'cart-remove' },
    ];

    const menuItems = [
        { label: 'Hỗ trợ', icon: 'question-circle-o', library: FontAwesome },
        { label: 'Cài đặt', icon: 'cogs', library: FontAwesome5 },
        { label: 'Điều khoản & Chính sách', icon: 'file-text', library: FontAwesome },
        { label: 'Chỉnh sửa thông tin', icon: 'edit', library: FontAwesome5 },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image source={{ uri: profile.image }} style={styles.avatar} />
                    <View style={styles.userInfo}>
                        <Text style={styles.shopName}>{profile.fullname}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.notificationIcon}>
                    <FontAwesome name="bell" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
                {/* Thống kê */}
                <View style={styles.statsContainer}>
                    <Text style={styles.statsTitle}>Đơn hàng</Text>
                    <View style={styles.statsList}>
                        {stats.map((item, index) => (
                            <View key={index} style={styles.statItem}>
                                <FontAwesome5 name={item.icon} size={24} color="#ed7c44" />
                                <Text style={styles.statLabel}>{item.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Menu chức năng */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => {
                        const IconComponent = item.library;
                        return (
                            <TouchableOpacity key={index} style={styles.menuItem}>
                                <View style={styles.menuItemLeft}>
                                    <IconComponent name={item.icon} size={20} color="#ed7c44" />
                                    <Text style={styles.menuText}>{item.label}</Text>
                                </View>
                                <FontAwesome name="angle-right" size={20} color="#999" />
                            </TouchableOpacity>
                        );
                    })}
                </View></View>

            {/* Nút đăng xuất */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9f1ff',
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#699BF4',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 50

    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    userInfo: {
        justifyContent: 'center',
    },
    shopName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    notificationIcon: {
        padding: 10,
    },
    statsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 15
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    statsList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    statLabel: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    menuContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        marginTop: 15
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#ed7c44',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
        marginBottom: 50
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default ProfileScreen;