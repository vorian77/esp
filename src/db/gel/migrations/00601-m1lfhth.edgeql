CREATE MIGRATION m1lfhthi5txoqebn2ozwsjoux75md6nslmxzgjk4vdu7ez7mc2soaa
    ONTO m1wxwh7goisftxyb3rcjkeoefprm2ed7dkhxofz7orq2wqe6ybhg7a
{
              ALTER TYPE sys_user::SysUserTypeResource {
      ALTER LINK userTypeResource {
          SET TYPE sys_core::ObjRoot;
      };
  };
};
