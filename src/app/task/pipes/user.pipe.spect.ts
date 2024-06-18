import { SharedStore } from '../../shared/shared-store';
import { UserPipe } from './user.pipe';

describe('UserPipe', () => {
  it('create an instance', () => {
    const pipe = new UserPipe(new SharedStore());
    expect(pipe).toBeTruthy();
  });
});
