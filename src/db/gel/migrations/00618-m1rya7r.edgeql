CREATE MIGRATION m1rya7re5mvmenktq3mvqqrqs4lrwcxzotqsjp34nzi7ixl4hrjl6q
    ONTO m1kbyhmt7lnuaiy7kh72qbz7maytvctld4oxo3aexkfww5pylsbhyq
{
              ALTER TYPE sys_core::SysCode {
      CREATE CONSTRAINT std::exclusive ON ((.codeType, .name));
      DROP LINK createdByOld;
      DROP LINK modifiedByOld;
      DROP PROPERTY createdAtOld;
      DROP PROPERTY modifiedAtOld;
  };
};
