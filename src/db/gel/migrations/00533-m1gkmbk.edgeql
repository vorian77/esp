CREATE MIGRATION m1gkmbkqfspeggjxm6e76kn6yqp3kgjcof37q46oylwb3mk4eiyucq
    ONTO m1247c6gav4blibhirgncfopxpr3bw7fy3x4wkid2ac7vurqw4qzkq
{
              CREATE TYPE default::SysError {
      CREATE REQUIRED LINK user: sys_user::SysUser {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_of_transaction());
          SET readonly := true;
      };
      CREATE PROPERTY errFile: std::str;
      CREATE PROPERTY errFunction: std::str;
      CREATE PROPERTY errMsg: std::str;
  };
};
