CREATE MIGRATION m1xvwjst54nk4syez47mvysn24hynetx6umfdmxczgm37qtp6uzvqa
    ONTO m1kzzyyfmxqdjctfwxpxakskyj53cugtxgsyl7ml7oxebr62vsxdwq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY listSuppressSelect {
          RENAME TO isListSuppressSelect;
      };
  };
};
