CREATE MIGRATION m13mynkreqrbg646rn7hfa46hsx3hpoftronta5skmx2hxngrkwi4a
    ONTO m1vza2or23cllfcztdgrko6mn72ktizi6jatn3f7tzugvwhd2rjqfq
{
  ALTER TYPE sys_user::SysUserParm {
      ALTER LINK codeType {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      ALTER LINK user {
          SET REQUIRED USING (<sys_user::SysUser>{});
      };
      ALTER PROPERTY idFeature {
          SET REQUIRED USING (<std::int64>{});
      };
      ALTER PROPERTY parmData {
          SET REQUIRED USING (<std::json>{});
      };
  };
};
