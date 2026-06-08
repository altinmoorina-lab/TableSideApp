import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useTableSide } from '@/context/table-side-context';

const times = ['18:30', '19:30', '20:00', '21:00'];

export default function BookingsScreen() {
  const { restaurants, reservations, reserveTable } = useTableSide();
  const [restaurantId, setRestaurantId] = useState(restaurants[0]?.id ?? '');
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState(2);
  const [saving, setSaving] = useState(false);

  const selectedRestaurant = restaurants.find((item) => item.id === restaurantId) ?? restaurants[0];

  const handleReserve = async () => {
    setSaving(true);
    await reserveTable(selectedRestaurant.id, '2026-06-08', time, guests);
    setSaving(false);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Book a table</Text>
        <Text style={styles.subtitle}>Choose a place, time, and guest count.</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Restaurant</Text>
        <View style={styles.optionGrid}>
          {restaurants.map((restaurant) => {
            const active = restaurant.id === restaurantId;

            return (
              <Pressable
                key={restaurant.id}
                onPress={() => setRestaurantId(restaurant.id)}
                style={[styles.restaurantOption, active && styles.activeOption]}>
                <Text style={[styles.optionName, active && styles.activeText]}>{restaurant.name}</Text>
                <Text style={[styles.optionMeta, active && styles.activeSoftText]}>
                  {restaurant.area} · {restaurant.nextSlot}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.rowPanels}>
        <View style={styles.smallPanel}>
          <Text style={styles.panelTitle}>Guests</Text>
          <View style={styles.stepper}>
            <Pressable style={styles.stepButton} onPress={() => setGuests(Math.max(1, guests - 1))}>
              <Text style={styles.stepText}>-</Text>
            </Pressable>
            <Text style={styles.guestCount}>{guests}</Text>
            <Pressable style={styles.stepButton} onPress={() => setGuests(Math.min(8, guests + 1))}>
              <Text style={styles.stepText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.smallPanel}>
          <Text style={styles.panelTitle}>Weather API</Text>
          <Text style={styles.weatherValue}>22 C</Text>
          <Text style={styles.weatherLabel}>Clear evening</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Time</Text>
        <View style={styles.timeGrid}>
          {times.map((slot) => {
            const active = slot === time;

            return (
              <Pressable key={slot} style={[styles.timeChip, active && styles.activeTimeChip]} onPress={() => setTime(slot)}>
                <Text style={[styles.timeText, active && styles.activeTimeText]}>{slot}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Pressable style={styles.reserveButton} onPress={handleReserve} disabled={saving}>
        <Text style={styles.reserveText}>{saving ? 'Saving...' : `Reserve ${selectedRestaurant.name}`}</Text>
      </Pressable>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>My reservations</Text>
        {reservations.map((reservation) => (
          <View key={reservation.id} style={styles.reservationRow}>
            <View style={styles.statusDot} />
            <View style={styles.reservationInfo}>
              <Text style={styles.reservationName}>{reservation.restaurantName}</Text>
              <Text style={styles.reservationMeta}>
                {reservation.date} · {reservation.time} · {reservation.guests} guests
              </Text>
            </View>
            <Text style={styles.statusText}>{reservation.status}</Text>
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
    gap: 16,
  },
  header: {
    gap: 6,
  },
  title: {
    color: '#171A17',
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: '#746F66',
    fontSize: 15,
    lineHeight: 21,
  },
  panel: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: '#EFE6DA',
  },
  panelTitle: {
    color: '#171A17',
    fontSize: 17,
    fontWeight: '900',
  },
  optionGrid: {
    gap: 10,
  },
  restaurantOption: {
    borderRadius: 18,
    backgroundColor: '#F7F2EA',
    padding: 14,
    gap: 4,
  },
  activeOption: {
    backgroundColor: '#19231F',
  },
  optionName: {
    color: '#171A17',
    fontSize: 15,
    fontWeight: '900',
  },
  optionMeta: {
    color: '#777166',
    fontSize: 13,
    fontWeight: '700',
  },
  activeText: {
    color: '#FFF8EA',
  },
  activeSoftText: {
    color: '#C9C0B2',
  },
  rowPanels: {
    flexDirection: 'row',
    gap: 12,
  },
  smallPanel: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#EFE6DA',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6B44B',
  },
  stepText: {
    color: '#171A17',
    fontSize: 22,
    fontWeight: '900',
  },
  guestCount: {
    color: '#171A17',
    fontSize: 28,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
  weatherValue: {
    color: '#171A17',
    fontSize: 26,
    fontWeight: '900',
  },
  weatherLabel: {
    color: '#777166',
    fontSize: 13,
    fontWeight: '700',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeChip: {
    borderRadius: 999,
    backgroundColor: '#F7F2EA',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  activeTimeChip: {
    backgroundColor: '#F6B44B',
  },
  timeText: {
    color: '#514C45',
    fontSize: 14,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
  activeTimeText: {
    color: '#171A17',
  },
  reserveButton: {
    borderRadius: 19,
    backgroundColor: '#19231F',
    paddingVertical: 17,
    alignItems: 'center',
  },
  reserveText: {
    color: '#FFF8EA',
    fontSize: 15,
    fontWeight: '900',
  },
  reservationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#78C6A3',
  },
  reservationInfo: {
    flex: 1,
    gap: 3,
  },
  reservationName: {
    color: '#171A17',
    fontSize: 15,
    fontWeight: '900',
  },
  reservationMeta: {
    color: '#777166',
    fontSize: 12,
    fontWeight: '700',
  },
  statusText: {
    color: '#8D5A12',
    fontSize: 12,
    fontWeight: '900',
  },
});
