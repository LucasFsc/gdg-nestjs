export default <T extends { _id?: string }>(Class: { new (): T }) => ({
  create: jest.fn().mockImplementation((dto: T) => ({
    ...dto,
  })),
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockImplementation(() => [new Class()]),
  })),
  findById: jest.fn().mockImplementation((_id?: string) => ({
    exec: jest
      .fn()
      .mockImplementation(() =>
        Object.assign<T, Partial<T>>(new Class(), { _id } as T),
      ),
  })),
  findByIdAndUpdate: jest
    .fn()
    .mockImplementation((_id: string, update: Partial<T>) => ({
      exec: jest.fn().mockImplementation(() =>
        Object.assign<T, Partial<T>>(new Class(), {
          _id,
          ...update,
        }),
      ),
    })),
  findByIdAndDelete: jest.fn().mockImplementation((_id: string) => ({
    exec: jest.fn().mockImplementation(() =>
      Object.assign<T, Partial<T>>(new Class(), {
        _id,
      } as T),
    ),
  })),
});
