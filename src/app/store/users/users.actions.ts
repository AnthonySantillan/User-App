import {createAction, props} from "@ngrx/store";
import {User} from "../../models/user";

export const findAll = createAction('findAll', props<{users:User[]}>());
export const findAllPage = createAction('findAllPage', props<{users:User[], paginator:any}>());
export const setPaginator = createAction('setPaginator', props<{paginator: any}>());
export const find = createAction('find', props<{id: number}>());
export const resetUser = createAction('resetUser');
export const add = createAction('add', props<{userNew: User}>());
export const addSuccess = createAction('addSuccess', props<{userNew: User}>());
export const update = createAction('update', props<{userUpdated: User}>());
export const updateSuccess = createAction('updateSuccess', props<{userUpdated: User}>());
export const remove = createAction('remove', props<{id: number}>());
export const removeSuccess = createAction('removeSuccess', props<{id: number}>());

export const load = createAction('load', props<{page: number}>())

export const setErrors = createAction('setErrors', props<{errors: any, userForm: User}>());

