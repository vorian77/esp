CREATE MIGRATION m1dxvnjdn26zcn7eiqub3uwhooq7s7lm445qtfbooscty3rl2rnt7q
    ONTO m1hgvcekpmxcp6p5q52mjvr6niwhgwzajvaianfxkbeujcmfqys6kq
{
  ALTER TYPE sys_core::SysOrg {
      ALTER LINK testCode {
          RENAME TO testCodeMulti;
      };
  };
};
