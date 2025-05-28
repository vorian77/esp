CREATE MIGRATION m1hpkhuiplh2xqq35lumkqv2once6ibun2aypp7iwa76e7nnvzq2lq
    ONTO m1ijetnndiyq6hgs6yb5emplu6d56xw32zic3pyhml67z6zofpat3q
{
  ALTER TYPE sys_user::SysUser {
      ALTER LINK owner {
          RENAME TO owner1;
      };
  };
};
