import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useTableSide } from '@/context/table-side-context';

const filters = ['Dinner', 'Date night', 'Outdoor', 'Private'];

export default function ExploreScreen() {
  const { restaurants } = useTableSide();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Find a table</Text>
        <Text style={styles.subtitle}>Curated places with availability, ratings, and quick booking.</Text>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchText}>Search restaurants, cuisine, area</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {filters.map((filter, index) => (
          <Pressable key={filter} style={[styles.filterChip, index === 0 && styles.filterChipActive]}>
            <Text style={[styles.filterText, index === 0 && styles.filterTextActive]}>{filter}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.featured}>
        <View style={styles.featuredCopy}>
          <Text style={styles.featuredLabel}>API pick</Text>
          <Text style={styles.featuredTitle}>Fastest tables tonight</Text>
          <Text style={styles.featuredMeta}>Availability updates are provided by the TableSide API layer.</Text>
        </View>
        <Link href="/bookings" asChild>
          <Pressable style={styles.featuredButton}>
            <Text style={styles.featuredButtonText}>Book</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Open now</Text>
        <Text style={styles.listCount}>{restaurants.length} spots</Text>
      </View>

      {restaurants.map((spot) => (
        <View key={spot.id} style={styles.card}>
          <Image source={{ uri: spot.image }} style={styles.cardImage} contentFit="cover" />
          <View style={styles.cardBody}>
            <View style={styles.cardTop}>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{spot.name}</Text>
                <Text style={styles.cardMeta}>
                  {spot.area} · {spot.cuisine}
                </Text>
              </View>
              <View style={styles.ratingPill}>
                <Text style={styles.ratingText}>{spot.rating.toFixed(1)}</Text>
              </View>
            </View>
            <Text style={styles.moodText}>{spot.mood}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.slotText}>{spot.nextSlot} next</Text>
              <Text style={styles.seatsText}>{spot.seatsOpen} tables</Text>
            </View>
          </View>
        </View>
      ))}
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
  searchBox: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#E8DED1',
  },
  searchText: {
    color: '#948C80',
    fontSize: 15,
    fontWeight: '700',
  },
  filters: {
    gap: 10,
    paddingRight: 20,
  },
  filterChip: {
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E8DED1',
  },
  filterChipActive: {
    backgroundColor: '#19231F',
    borderColor: '#19231F',
  },
  filterText: {
    color: '#5D574F',
    fontSize: 13,
    fontWeight: '900',
  },
  filterTextActive: {
    color: '#FFF8EA',
  },
  featured: {
    borderRadius: 26,
    backgroundColor: '#19231F',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  featuredCopy: {
    flex: 1,
    gap: 5,
  },
  featuredLabel: {
    color: '#F6B44B',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  featuredTitle: {
    color: '#FFF8EA',
    fontSize: 21,
    fontWeight: '900',
  },
  featuredMeta: {
    color: '#C9C0B2',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  featuredButton: {
    borderRadius: 16,
    backgroundColor: '#F6B44B',
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  featuredButtonText: {
    color: '#171A17',
    fontSize: 14,
    fontWeight: '900',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTitle: {
    color: '#171A17',
    fontSize: 20,
    fontWeight: '900',
  },
  listCount: {
    color: '#777166',
    fontSize: 13,
    fontWeight: '900',
  },
  card: {
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFE6DA',
  },
  cardImage: {
    height: 150,
    width: '100%',
  },
  cardBody: {
    padding: 15,
    gap: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardText: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    color: '#171A17',
    fontSize: 18,
    fontWeight: '900',
  },
  cardMeta: {
    color: '#777166',
    fontSize: 13,
    fontWeight: '700',
  },
  ratingPill: {
    borderRadius: 999,
    backgroundColor: '#F7F2EA',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  ratingText: {
    color: '#171A17',
    fontSize: 13,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
  moodText: {
    color: '#514C45',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slotText: {
    color: '#8D5A12',
    fontSize: 13,
    fontWeight: '900',
  },
  seatsText: {
    color: '#21483A',
    fontSize: 13,
    fontWeight: '900',
  },
});
