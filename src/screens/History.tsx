import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Heading, VStack, SectionList, Text, useToast } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';
import { Loading } from '@components/Loading';

import { AppError } from '@utils/AppError';

import { api } from '@services/api';
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO';

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      const response = await api.get('/history');
      setExercises(response.data)
      
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível carregar o histórico.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory();
  }, []));

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? <Loading /> : (
        <SectionList
          sections={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoryCard data={item} />
          )}
          renderSectionHeader={({ section }) => (
            <Heading fontFamily="heading" color="gray.200" fontSize="md" mt={10} mb={3}>
              {section.title}
            </Heading>
          )}
          px={8}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. {'\n'}
              Vamos fazer exercícios hoje?
            </Text>
          )}
        />
      )}
    </VStack>
  );
}
