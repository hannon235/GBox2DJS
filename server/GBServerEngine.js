/****************************************************************************
 Copyright (c) 2012 - Chris Hannon / http://www.channon.us

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var Box2D = require('./../lib/box2d/box2d.js');

// Shorthand "imports"
var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2AABB = Box2D.Collision.b2AABB,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef,
    b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape;
b2ContactListener = Box2D.Dynamics.b2ContactListener;

var g_gbserverengineinstance = null;

(function(){

    GBox2D.namespace("GBox2D.GBServerEngine");

    /**
     implmenting the gbengine class, a singleton to handle management of the box2d world, compile movements of box2d bodies, register and fire a custom contact listener and remove bodies from a queue

     */
    GBox2D.GBServerEngine = function() {
        this.init();
        this.setupNetwork();
        this.setupCmdMap();
    };

    GBox2D.GBServerEngine.prototype = {
        // Properties
        /**
         * Function to setup networking (instantiate client or server net)
         */
        setupNetwork : function() {
            this.netChannel = GBox2D.GBServerNet.prototype.getInstance();
        },

        /**
         * Function to setup common command map if needed
         */
        setupCmdMap : function() { },

        /**
         initialize a new instance of the engine
         */
        init : function() {
            var doSleep = true;

            this.world = new b2World(
                new b2Vec2(0, 10) //gravity
                , doSleep //allow sleep
            );

            this.receiver = null;

            var that = this;
            this.gameClockReal = new Date().getTime();
            this.intervalTargetDelta = Math.floor( 1000/this.intervalFramerate );
            this.intervalGameTick = setInterval( function(){ that.update() }, this.intervalTargetDelta);
        },

        /**
         @return the singleton instance of gbengine
         */
        getInstance : function() {
            if(g_gbserverengineinstance == null) {
                g_gbserverengineinstance = new GBox2D.GBClientEngine();
            }
            return g_gbserverengineinstance;
        },

        /**
         this method will be scheduled to be called at the frame rate interval
         in the server, it will be responsible for stepping the physics world and pushing the world states
         */
        update : function() {


        }


    };

    GBox2D.extend(GBox2D.GBServerEngine, GBox2D.GBEngine, null);
})()