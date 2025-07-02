CREATE MIGRATION m1tnj474rbapcinx7v3jxdziro2xhldeday3gld4c3ehnuikhjne5a
    ONTO m1b5vfrxgcbwypvvfch2piv2tugtqylxtu7es4kcc2hp5rfi55gega
{
  ALTER TYPE sys_user::SysUser {
      ALTER PROPERTY password {
          SET default := (SELECT
              <std::str>std::uuid_generate_v4()
          );
      };
  };
};
