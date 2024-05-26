import { Mongo } from 'meteor/mongo'

export const CompetitionsCollection = new Mongo.Collection('competitions')

export const WodsCollection = new Mongo.Collection('wods')
