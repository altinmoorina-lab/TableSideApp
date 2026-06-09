import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useTableSide } from '@/context/table-side-context';

const preferences = ['Window seat', 'Italian', 'Quiet', 'Outdoor'];

export default function ProfileScreen() {
  const { user, reservations, notifications, unreadCount, markNotificationsRead, signOut } = useTableSide();

  const initials =
    user?.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'TS';

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}>
      
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <Text style={styles.name}>{user?.name ?? 'Guest user'}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>⭐ GOLD MEMBER</Text>
        </View>

        <Text style={styles.role}>{user?.membership ?? 'Visitor'}</Text>

        <Text style={styles.welcomeText}>
          Welcome back to TableSide 👋
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{reservations.length}</Text>
          <Text style={styles.statLabel}>Bookings</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>{unreadCount}</Text>
          <Text style={styles.statLabel}>Alerts</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Dining Style</Text>

        <View style={styles.chipRow}>
          {preferences.map((preference) => (
            <View key={preference} style={styles.chip}>
              <Text style={styles.chipText}>{preference}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Quick Actions</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>❤️ Favorite Restaurants</Text>
          <Text style={styles.infoValue}>4</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🎁 Reward Points</Text>
          <Text style={styles.infoValue}>1,250</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🏆 Membership Level</Text>
          <Text style={styles.infoValue}>Gold</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Notifications</Text>

          <Pressable onPress={markNotificationsRead}>
            <Text style={styles.markRead}>Mark read</Text>
          </Pressable>
        </View>

        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationRow}>
            <View
              style={[
                styles.notificationDot,
                !notification.unread && styles.notificationDotMuted,
              ]}
            />

            <View style={styles.notificationText}>
              <Text style={styles.notificationTitle}>
                {notification.title}
              </Text>

              <Text style={styles.notificationBody}>
                {notification.body}
              </Text>
            </View>

            <Text style={styles.notificationTime}>
              {notification.time}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Account</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>

          <Text selectable style={styles.infoValue}>
            {user?.email ?? 'not signed in'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Role</Text>
          <Text style={styles.infoValue}>Customer</Text>
        </View>
      </View>

      <Link href="/login" asChild>
        <Pressable style={styles.signOutButton} onPress={signOut}>
          <Text style={styles.signOutText}>Switch Account</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F2EA',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },

  profileCard: {
    borderRadius: 32,
    backgroundColor: '#19231F',
    padding: 28,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F6B44B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  avatarText: {
    color: '#171A17',
    fontSize: 30,
    fontWeight: '900',
  },

  badge: {
    backgroundColor: '#F6B44B',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 8,
  },

  badgeText: {
    color: '#171A17',
    fontSize: 12,
    fontWeight: '900',
  },

  name: {
    color: '#FFF8EA',
    fontSize: 24,
    fontWeight: '900',
  },

  role: {
    color: '#C9C0B2',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },

  welcomeText: {
    color: '#D8D0C5',
    fontSize: 13,
    marginTop: 8,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },

  stat: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 18,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  statValue: {
    color: '#171A17',
    fontSize: 22,
    fontWeight: '900',
  },

  statLabel: {
    color: '#777166',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },

  panel: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: '#EFE6DA',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  panelTitle: {
    color: '#171A17',
    fontSize: 18,
    fontWeight: '900',
  },

  markRead: {
    color: '#8D5A12',
    fontSize: 13,
    fontWeight: '900',
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  chip: {
    borderRadius: 999,
    backgroundColor: '#DDF4EC',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  chipText: {
    color: '#21483A',
    fontSize: 13,
    fontWeight: '800',
  },

  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },

  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#F6B44B',
  },

  notificationDotMuted: {
    backgroundColor: '#D8D0C5',
  },

  notificationText: {
    flex: 1,
  },

  notificationTitle: {
    color: '#171A17',
    fontSize: 14,
    fontWeight: '900',
  },

  notificationBody: {
    color: '#777166',
    fontSize: 12,
    lineHeight: 16,
  },

  notificationTime: {
    color: '#8D5A12',
    fontSize: 12,
    fontWeight: '900',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoLabel: {
    color: '#777166',
    fontSize: 14,
    fontWeight: '700',
  },

  infoValue: {
    color: '#171A17',
    fontSize: 14,
    fontWeight: '800',
  },

  signOutButton: {
    borderRadius: 20,
    backgroundColor: '#F6B44B',
    paddingVertical: 18,
    alignItems: 'center',
  },

  signOutText: {
    color: '#171A17',
    fontSize: 16,
    fontWeight: '900',
  },
});