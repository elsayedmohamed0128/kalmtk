import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

// عرض الـ Rail ثابت (64px)
const RAIL_WIDTH = 64; 
// عرض الشريط الجانبي الموسع
const EXPANDED_WIDTH = 260; 

export const Sidebar = ({ conversations = [], onSelectConversation = () => {}, collapsed = false }) => {
    const { theme } = useTheme();
    const navigation = useNavigation();

    // نستخدم حالة بسيطة (false) لتمثيل أيقونة الملف الشخصي
    // يمكن هنا إضافة منطق لتسجيل الخروج أو الترقية
    const [profileOpen, setProfileOpen] = useState(false);
    
    // الأيقونات الأساسية في الجزء العلوي من الـ Rail
    const TopNavItems = (
        <View style={styles.navGroup}>
            {/* أيقونة بدء محادثة جديدة / الرئيسية */}
            <TouchableOpacity style={styles.iconBtn} accessibilityLabel="New chat" onPress={() => navigation.navigate('HomeStack')}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            {/* أيقونة السجل / التاريخ */}
            <TouchableOpacity style={styles.iconBtn} accessibilityLabel="History" onPress={() => navigation.navigate('HistoryStack')}>
                <Ionicons name="time-outline" size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
        </View>
    );

    // أيقونة الملف الشخصي الثابتة في الجزء السفلي من الـ Rail
    const BottomProfileItem = (
        <View style={styles.profileRailItem}>
            <TouchableOpacity 
                onPress={() => setProfileOpen((s) => !s)}
                style={[styles.avatarPlaceholderSmall, 
                        { backgroundColor: theme.colors.surfaceVariant || theme.colors.divider, 
                          borderWidth: 1, 
                          borderColor: theme.colors.outline 
                        }
                      ]} 
                accessibilityLabel="Profile"
            />
        </View>
    );

    // --------------------------------------------------------------------------------------------------
    // هيكل الـ Rail (الجزء الضيق)
    // --------------------------------------------------------------------------------------------------
    const Rail = (
        <View style={[styles.iconRail, { backgroundColor: theme.colors.surface, borderRightColor: theme.colors.divider }]}>
            {TopNavItems}
            {BottomProfileItem}
        </View>
    );
    
    // --------------------------------------------------------------------------------------------------
    // المحتوى الموسع (قائمة المحادثات والإعدادات)
    // --------------------------------------------------------------------------------------------------
    const ExpandedContent = (
        <View style={[styles.expandedContent, { backgroundColor: theme.colors.surface, borderLeftColor: theme.colors.divider }]}>
            
            {/* الجزء العلوي: قائمة المحادثات (يستخدم flex: 1 ليأخذ المساحة المتاحة) */}
            <ScrollView contentContainerStyle={styles.scroll} style={{ flex: 1 }}>
                <View style={styles.convList}>
                    {conversations.map((c) => (
                        <TouchableOpacity key={c.id} style={styles.convItem} onPress={() => onSelectConversation(c.id)}>
                            <Text numberOfLines={1} style={[styles.convTitle, { color: theme.colors.textPrimary }]}>{c.name}</Text>
                        </TouchableOpacity>
                    ))}
                    {conversations.length === 0 && (
                        <Text style={[styles.emptyListText, { color: theme.colors.textSecondary }]}>ابدأ محادثة جديدة...</Text>
                    )}
                </View>
            </ScrollView>

            {/* الجزء السفلي: خيارات الإعدادات والملف الشخصي (ثابت في الأسفل) */}
            <View style={[styles.profileWrap, { borderTopWidth: 1, borderTopColor: theme.colors.divider, backgroundColor: theme.colors.surface }]}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileStack')} style={styles.profileMenuItem}>
                    <Text style={[styles.profileText, { color: theme.colors.textPrimary }]}>الملف الشخصي</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SettingsStack')} style={styles.profileMenuItem}>
                    <Text style={[styles.profileText, { color: theme.colors.textPrimary }]}>الإعدادات</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    // --------------------------------------------------------------------------------------------------
    // الهيكل الرئيسي للمكون
    // --------------------------------------------------------------------------------------------------

    return (
        <View style={[styles.containerWrapper, { borderRightColor: theme.colors.divider }]}> 
            {Rail}
            {!collapsed && ExpandedContent}
        </View>
    );
};

// --------------------------------------------------------------------------------------------------
// التنسيقات (Styles) - تم تعديلها لتصبح أكثر نظافة
// --------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
    containerWrapper: {
        flexDirection: 'row',
        height: '100%',
        borderRightWidth: 1,
    },
    iconRail: {
        width: RAIL_WIDTH, 
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'space-between', // مفتاح تثبيت العناصر العلوية والسفلية
        height: '100%',
    },
    navGroup: {
        gap: 4,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileRailItem: {
        // لا يوجد حاجة لتنسيق معقد، space-between في الأب يكفي
        paddingVertical: 4,
    },
    avatarPlaceholderSmall: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    expandedContent: {
        width: EXPANDED_WIDTH - RAIL_WIDTH, // العرض الكلي ناقص عرض الـ Rail
        height: '100%',
        flexDirection: 'column', // لتمكين Flexbox من توزيع الأجزاء عمودياً
    },
    scroll: {
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    convList: {
        gap: 6,
    },
    convItem: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    convTitle: {
        fontSize: 14,
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 12,
    },
    profileWrap: {
        // المنطقة السفلية الثابتة للإعدادات/الملف الشخصي
        paddingVertical: 8,
    },
    profileMenuItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    profileText: {
        fontSize: 14,
    },
});
