CREATE MIGRATION m1ycv6jhea47nonqxohgtdfvvpmn3hnuyd4dlw3m3v5re3pp7uvn2q
    ONTO m1e3gmadakx3xkmimybaosf5hpdln6weuur4edbolakcspppovfz4a
{
  ALTER TYPE sys_core::SysMsg {
      ALTER LINK recipients {
          SET TYPE sys_core::ObjRoot;
      };
  };
};
