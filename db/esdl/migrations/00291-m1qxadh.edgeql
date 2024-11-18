CREATE MIGRATION m1qxadh5bvs6rst4up4n4r3f4h64kmb242uv4w2muciycecnfljsrq
    ONTO m1sinycw7tspyx5aczy4hnzidkxdhbxrnjidug3kj4h33cjfbtxxya
{
      CREATE TYPE sys_user::SysUserTypeResourceObject {
      CREATE LINK objects := (SELECT
          (SELECT
              (((sys_core::SysObj[IS sys_core::SysOrg] UNION sys_core::SysObj[IS sys_core::SysResource]) UNION sys_core::SysObj[IS sys_user::SysWidget]) UNION (SELECT
                  sys_core::SysObj[IS sys_core::SysNodeObj]
              FILTER
                  (.codeNodeType.name = 'program')
              ))
          )
      );
  };
};
