import { useState } from 'react';
import { Center, HStack, Text, VStack, FlatList, Heading } from 'native-base';

import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Group';
import { ExerciseCard } from '@components/ExerciseCard';

export function Home() {
  const [groups, setGroups] = useState(['costa', 'ombro', 'bíceps', 'tríceps', 'perna']);
  const [groupSelected, setGroupSelected] = useState('costa');
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Levantamento terras']);

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <ExerciseCard />
          )}
        />
      </VStack>
    </VStack>
  );
}
