CREATE MIGRATION m1nqjodagtvfotfzh3rmcgc7ulyrfkuzh6xayw24xz3tmy6ksdjr5q
    ONTO m1ka7eoelc3ppvoymxrcu6l3ooppjz53eq62phiu44l4mfz7hugaqa
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      DROP CONSTRAINT std::exclusive ON (.name);
  };
};
