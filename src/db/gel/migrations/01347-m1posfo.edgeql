CREATE MIGRATION m1posfo3y5t5auzkfsxqkkd4dazja42kmmojfj72viq7aksjftc6uq
    ONTO m1mikbvdi25o3c2ag5qu327o5iamqjhjlqhl6tk5rkggeacgmmqsyq
{
  ALTER TYPE sys_user::SysUser {
      ALTER LINK defaultSystem {
          RENAME TO systemDefault;
      };
  };
};
