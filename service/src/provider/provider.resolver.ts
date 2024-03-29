import { Inject } from '@nestjs/common';
import { CONTEXT, Resolver } from '@nestjs/graphql';
import { ObjectType } from 'type-graphql';
import { BasePaginate, BaseResolver } from '../core';
import { Provider } from '../database';

@ObjectType()
export class ProviderPaginate extends BasePaginate(Provider) { }

@Resolver(of => Provider)
export class ProviderResolver extends BaseResolver(Provider, ProviderPaginate) {
    constructor(@Inject(CONTEXT) context) { super(context, 'provider'); }
}