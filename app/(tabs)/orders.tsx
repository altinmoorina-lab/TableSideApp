import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MenuItem, menuItems } from '@/constants/table-side-data';
import { useTableSide } from '@/context/table-side-context';

export default function OrdersScreen() {
  const { reservations, orders, placeOrder } = useTableSide();
  const [selectedIds, setSelectedIds] = useState<string[]>(['truffle-pasta']);
  const [saving, setSaving] = useState(false);

  const selectedItems = useMemo(
    () => menuItems.filter((item) => selectedIds.includes(item.id)),
    [selectedIds],
  );
  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const activeReservation = reservations[0];

  const toggleItem = (item: MenuItem) => {
    setSelectedIds((current) =>
      current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id],
    );
  };

  const handleOrder = async () => {
    if (!activeReservation) {
      return;
    }

    setSaving(true);
    await placeOrder(activeReservation.id, selectedItems);
    setSaving(false);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu & orders</Text>
        <Text style={styles.subtitle}>Pre-order dishes for your active reservation.</Text>
      </View>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Active table</Text>
          <Text style={styles.summaryTitle}>{activeReservation?.restaurantName ?? 'No reservation yet'}</Text>
        </View>
        <Text style={styles.summaryTime}>{activeReservation?.time ?? '--:--'}</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Chef menu</Text>
        {menuItems.map((item) => {
          const selected = selectedIds.includes(item.id);

          return (
            <Pressable
              key={item.id}
              onPress={() => toggleItem(item)}
              style={[styles.menuRow, selected && styles.menuRowSelected]}>
              <View style={styles.menuInfo}>
                <Text style={[styles.menuName, selected && styles.selectedText]}>{item.name}</Text>
                <Text style={[styles.menuMeta, selected && styles.selectedSoftText]}>
                  {item.category} {item.popular ? '· Popular' : ''}
                </Text>
              </View>
              <Text style={[styles.priceText, selected && styles.selectedText]}>${item.price.toFixed(2)}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.checkoutCard}>
        <View>
          <Text style={styles.checkoutLabel}>{selectedItems.length} selected</Text>
          <Text style={styles.checkoutTotal}>${total.toFixed(2)}</Text>
        </View>
        <Pressable style={styles.orderButton} onPress={handleOrder} disabled={saving || selectedItems.length === 0}>
          <Text style={styles.orderText}>{saving ? 'Sending...' : 'Send to kitchen'}</Text>
        </Pressable>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Order history</Text>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderRow}>
            <View style={styles.orderDot} />
            <View style={styles.orderInfo}>
              <Text style={styles.orderTitle}>{order.items.length} item(s)</Text>
              <Text style={styles.orderMeta}>{order.items.map((item) => item.name).join(', ')}</Text>
            </View>
            <Text style={styles.orderStatus}>{order.status}</Text>
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
  summaryCard: {
    borderRadius: 26,
    backgroundColor: '#7E8CE0',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: '#EFF1FF',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  summaryTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  summaryTime: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
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
  menuRow: {
    borderRadius: 18,
    backgroundColor: '#F7F2EA',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuRowSelected: {
    backgroundColor: '#19231F',
  },
  menuInfo: {
    flex: 1,
    gap: 4,
  },
  menuName: {
    color: '#171A17',
    fontSize: 15,
    fontWeight: '900',
  },
  menuMeta: {
    color: '#777166',
    fontSize: 12,
    fontWeight: '700',
  },
  priceText: {
    color: '#171A17',
    fontSize: 14,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
  selectedText: {
    color: '#FFF8EA',
  },
  selectedSoftText: {
    color: '#C9C0B2',
  },
  checkoutCard: {
    borderRadius: 24,
    backgroundColor: '#F6B44B',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  checkoutLabel: {
    color: '#4A3214',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  checkoutTotal: {
    color: '#171A17',
    fontSize: 24,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
  orderButton: {
    borderRadius: 17,
    backgroundColor: '#19231F',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  orderText: {
    color: '#FFF8EA',
    fontSize: 13,
    fontWeight: '900',
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  orderDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#7E8CE0',
  },
  orderInfo: {
    flex: 1,
    gap: 3,
  },
  orderTitle: {
    color: '#171A17',
    fontSize: 15,
    fontWeight: '900',
  },
  orderMeta: {
    color: '#777166',
    fontSize: 12,
    fontWeight: '700',
  },
  orderStatus: {
    color: '#8D5A12',
    fontSize: 12,
    fontWeight: '900',
  },
});
