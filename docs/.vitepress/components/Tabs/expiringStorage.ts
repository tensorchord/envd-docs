/**
 * The MIT License (MIT)

 * Copyright (c) 2016-2018 Spatie bvba info@spatie.be Copyright (c) 2021 Jakub Potocký
 */

class ExpiringStorage {
  get(key: string) {
    const cached = JSON.parse(
      localStorage.getItem(key) as string
    );

    if (!cached) {
      return null;
    }

    const expires = new Date(cached.expires);

    if (expires < new Date()) {
      localStorage.removeItem(key);
      return null;
    }

    return cached.value;
  }

  set(key: string, value: string, lifeTimeInMinutes: number) {
    const currentTime = new Date().getTime();

    const expires = new Date(currentTime + lifeTimeInMinutes * 60000);

    localStorage.setItem(key, JSON.stringify({ value, expires }));
  }
}

export default new ExpiringStorage();
