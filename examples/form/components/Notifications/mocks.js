import { faker } from '@faker-js/faker';

export async function getNotifications({ cursor = 0, size = 10 }) {
  return await new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          notifications: cursor > 100 ? [] : Array.from({ length: size }, createNotification),
        }),
      500,
    );
  });
}

function createNotification() {
  const type = getRandomNotificationType();

  const user = type === 'new_tabcoins' ? `Você` : faker.internet.username().replace(/[_.-]/g, '').substring(0, 30);
  const action =
    type === 'new_tabcoins'
      ? `ganhou ${faker.number.int({ min: 1, max: 10 })} TabCoins em`
      : type === 'new_root_content'
        ? 'publicou'
        : 'comentou em';

  const body = faker.lorem.paragraph();
  const read = faker.datatype.boolean();
  const url = '/notifications';
  const updatedAt = faker.date.recent();

  const title = (
    <>
      <strong>{user}</strong> {action}
    </>
  );

  return {
    id: faker.string.uuid(),
    title,
    body,
    updated_at: updatedAt,
    read,
    type,
    url,
  };
}

function getRandomNotificationType() {
  const types = ['new_child_content', 'new_root_content', 'new_tabcoins'];
  const probabilities = [0.5, 0.1, 0.2];
  const random = Math.random();
  let cumulativeProbability = 0;

  for (let i = 0; i < types.length; i++) {
    cumulativeProbability += probabilities[i];
    if (random < cumulativeProbability) {
      return types[i];
    }
  }

  return types[0];
}
