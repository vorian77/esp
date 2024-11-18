CREATE MIGRATION m14ntpqhz4bexanly3qhk6nsimrclg5gevgd4llrlaxoksfahz35da
    ONTO m16f3qdr4ogzmiqrr6fzn5agtwmxpnzxu3bkif3xzfwviwa5ze26cq
{
      ALTER TYPE sys_rep::SysRepUser {
      ALTER PROPERTY nameUser {
          RENAME TO headerUser;
      };
  };
};
