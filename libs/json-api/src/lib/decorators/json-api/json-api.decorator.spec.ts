import 'reflect-metadata';

import { JSON_API_ENTITY, JSON_API_OPTIONS } from '../../constants/reflection';
import { JsonApi } from './json-api.decorator';
import { DecoratorOptions } from '../../types';
import {ExcludeMethode, Bindings} from '../../config/bindings';


describe('InjectServiceDecorator', () => {
  it('should save entity in class', () => {
    const testedEntity = class SomeEntity {};
    @JsonApi(testedEntity)
    class SomeClass {}

    const data = Reflect.getMetadata(JSON_API_ENTITY, SomeClass);
    expect(data).toBe(testedEntity);
  });

  it('should save options in class', () => {
    const testedEntity = class SomeEntity {};
    const apiOptions: DecoratorOptions = {
      allowMethode: ['getAll', 'deleteRelationship']
    }
    @JsonApi(testedEntity, apiOptions)
    class SomeClass {}

    const data = Reflect.getMetadata(JSON_API_OPTIONS, SomeClass);
    expect(data).toEqual(apiOptions);
  });

  it('should save options in class using helpFunction', () => {
    const testedEntity = class SomeEntity {};
    const example = ['getAll', 'deleteRelationship'];
    const apiOptions: DecoratorOptions = {
      allowMethode: ExcludeMethode(example as any)
    }
    @JsonApi(testedEntity, apiOptions)
    class SomeClass {}

    const data: DecoratorOptions = Reflect.getMetadata(JSON_API_OPTIONS, SomeClass);
    expect(data).toEqual(apiOptions);
    expect(data.allowMethode).toEqual(
      Object.keys(Bindings).filter((k) => !example.includes(k))
    )
  });
});
