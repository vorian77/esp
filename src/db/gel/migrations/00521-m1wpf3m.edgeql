CREATE MIGRATION m1wpf3mq7jc4n6b5mmsnjo6tk33udatpyova5anqj4cxixkn255tqq
    ONTO m1p2dmmueubsa27hbou5o67coppy3zsrzrd7dtyeocitzmrcafzuzq
{
              ALTER TYPE default::SysPerson {
      CREATE LINK avatar: default::SysFile;
  };
};
