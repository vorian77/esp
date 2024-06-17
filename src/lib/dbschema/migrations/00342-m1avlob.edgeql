CREATE MIGRATION m1avloblywj2ceftznqpcxo6snc3v4tgn6okoxgznkvra4xggctrsq
    ONTO m1cyeovin3ygeodqb3a2pxo56cba4wud6ylhrxmp5ssgafofxiqy3q
{
  ALTER TYPE sys_rep::SysRepUser {
      CREATE PROPERTY nameUser: std::str;
  };
};
