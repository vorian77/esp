CREATE MIGRATION m1n5y23r5psqxf5afomziqikmai6x5cvdrazf7b3pxaj35dhstpl7a
    ONTO m1dgocj3btutwfdkizfntgxsobsfcaey7omll2lvgpzpdk6p44vlgq
{
  ALTER TYPE sys_core::SysMsg {
      DROP PROPERTY isRead;
  };
};
