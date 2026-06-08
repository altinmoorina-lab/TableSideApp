import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { useTableSide } from '@/context/table-side-context';

export default function HomeScreen() {
  const { user, reservations, orders, notifications, restaurants, unreadCount, weather } = useTableSide();
  const nextReservation = reservations[0];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.hero}>
        <Image source={require('../../assets/images/tableside-hero.png')} style={styles.heroImage} contentFit="cover" />
        <View style={styles.heroShade} />
        <View style={styles.heroContent}>
          <View>
            <Text style={styles.kicker}>TableSide</Text>
            <Text style={styles.title}>Reserve. Order. Arrive relaxed.</Text>
          </View>
          <Text style={styles.welcome}>Hi {user?.name ?? 'guest'}, your evening is organized.</Text>
        </View>
      </View>

      <View style={styles.quickGrid}>
        <Link href="/bookings" asChild>
          <Pressable style={[styles.quickCard, styles.goldCard]}>
            <Text style={styles.quickLabel}>Booking</Text>
            <Text style={styles.quickValue}>{nextReservation?.time ?? 'New'}</Text>
            <Text style={styles.quickCaption}>{nextReservation?.restaurantName ?? 'Choose a table'}</Text>
          </Pressable>
        </Link>
        <Link href="/orders" asChild>
          <Pressable style={[styles.quickCard, styles.greenCard]}>
            <Text style={styles.quickLabel}>Kitchen</Text>
            <Text style={styles.quickValue}>{orders.length}</Text>
            <Text style={styles.quickCaption}>Active order(s)</Text>
          </Pressable>
        </Link>
        <Link href="/profile" asChild>
          <Pressable style={[styles.quickCard, styles.purpleCard]}>
            <Text style={styles.quickLabel}>Alerts</Text>
            <Text style={styles.quickValue}>{unreadCount}</Text>
            <Text style={styles.quickCaption}>Unread updates</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.apiCard}>
        <View>
          <Text style={styles.apiLabel}>External API demo</Text>
          <Text style={styles.apiTitle}>
            {weather.city} · {weather.label}
          </Text>
          <Text style={styles.apiText}>{weather.detail}</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular restaurants</Text>
        <Link href="/explore" asChild>
          <Pressable hitSlop={10}>
            <Text style={styles.sectionAction}>View all</Text>
          </Pressable>
        </Link>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.restaurantRail}>
        {restaurants.map((restaurant) => (
          <View key={restaurant.id} style={styles.restaurantCard}>
            <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} contentFit="cover" />
            <View style={styles.restaurantBody}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantMeta}>
                {restaurant.cuisine} · {restaurant.rating.toFixed(1)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Live notifications</Text>
        {notifications.slice(0, 3).map((notification) => (
          <View key={notification.id} style={styles.notificationRow}>
            <View style={[styles.notificationDot, !notification.unread && styles.notificationDotMuted]} />
            <View style={styles.notificationText}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationBody}>{notification.body}</Text>
            </View>
            <Text style={styles.notificationTime}>{notification.time}</Text>
          </View>
        ))}
      </View>
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
    paddingBottom: 36,
    gap: 18,
  },
  hero: {
    minHeight: 260,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#19231F',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 25, 22, 0.42)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 22,
  },
  kicker: {
    color: '#F6B44B',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFF8EA',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 40,
    maxWidth: 300,
  },
  welcome: {
    color: '#FFF8EA',
    fontSize: 15,
    fontWeight: '800',
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  quickCard: {
    flex: 1,
    minHeight: 128,
    borderRadius: 22,
    padding: 14,
    justifyContent: 'space-between',
  },
  goldCard: {
    backgroundColor: '#F6B44B',
  },
  greenCard: {
    backgroundColor: '#78C6A3',
  },
  purpleCard: {
    backgroundColor: '#7E8CE0',
  },
  quickLabel: {
    color: '#372A1B',
    fontSize: 12,
    fontWeight: '900',
  },
  quickValue: {
    color: '#171A17',
    fontSize: 24,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
  quickCaption: {
    color: '#3F3932',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  apiCard: {
    borderRadius: 24,
    backgroundColor: '#19231F',
    padding: 18,
  },
  apiLabel: {
    color: '#F6B44B',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  apiTitle: {
    color: '#FFF8EA',
    fontSize: 21,
    fontWeight: '900',
    marginTop: 4,
  },
  apiText: {
    color: '#C9C0B2',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#171A17',
    fontSize: 20,
    fontWeight: '900',
  },
  sectionAction: {
    color: '#8D5A12',
    fontSize: 14,
    fontWeight: '900',
  },
  restaurantRail: {
    gap: 12,
    paddingRight: 20,
  },
  restaurantCard: {
    width: 232,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE6DA',
  },
  restaurantImage: {
    height: 130,
    width: '100%',
  },
  restaurantBody: {
    padding: 14,
    gap: 4,
  },
  restaurantName: {
    color: '#171A17',
    fontSize: 16,
    fontWeight: '900',
  },
  restaurantMeta: {
    color: '#777166',
    fontSize: 12,
    fontWeight: '700',
  },
  panel: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#EFE6DA',
  },
  panelTitle: {
    color: '#171A17',
    fontSize: 17,
    fontWeight: '900',
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 7,
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
    gap: 3,
  },
  notificationTitle: {
    color: '#171A17',
    fontSize: 14,
    fontWeight: '900',
  },
  notificationBody: {
    color: '#777166',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  notificationTime: {
    color: '#8D5A12',
    fontSize: 12,
    fontWeight: '900',
  },
});
