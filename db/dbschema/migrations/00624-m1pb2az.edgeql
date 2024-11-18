CREATE MIGRATION m1pb2azq6mawx6kuvfvzmmewubnjybqg36hivwsuahbyio6l4drlzq
    ONTO m1nog3fiei4qjdt4xttq4u7nt63rob2kncqrm3j6ye7qggv3op35wq
{
  DROP FUNCTION sys_core::getSystem(ownerName: std::str, systemName: std::str);
  CREATE FUNCTION sys_core::getSystem(nameOwnerAndSystem: std::str) -> OPTIONAL sys_core::SysSystem USING (SELECT
      std::assert_single((SELECT
          sys_core::SysSystem
      FILTER
          ((.owner.name = nameOwnerAndSystem) AND (.name = nameOwnerAndSystem))
      ))
  );
};
