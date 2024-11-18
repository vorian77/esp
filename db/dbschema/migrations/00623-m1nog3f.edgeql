CREATE MIGRATION m1nog3fiei4qjdt4xttq4u7nt63rob2kncqrm3j6ye7qggv3op35wq
    ONTO m1psrjqp4wfic5wxkthwo5sjcj5j77uo4pnhqxoaix6mforftqgnla
{
  DROP FUNCTION sys_core::getSystem(ownerName: std::str, sysName: std::str);
  CREATE FUNCTION sys_core::getSystem(ownerName: std::str, systemName: std::str) -> OPTIONAL sys_core::SysSystem USING (SELECT
      std::assert_single((SELECT
          sys_core::SysSystem
      FILTER
          ((.owner.name = ownerName) AND (.name = systemName))
      ))
  );
};
