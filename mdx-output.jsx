import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
function _createMdxContent(props) {
  const _components = {
    annotation: "annotation",
    code: "code",
    em: "em",
    figure: "figure",
    h2: "h2",
    h3: "h3",
    hr: "hr",
    li: "li",
    math: "math",
    mi: "mi",
    mn: "mn",
    mo: "mo",
    mrow: "mrow",
    msub: "msub",
    ol: "ol",
    p: "p",
    pre: "pre",
    semantics: "semantics",
    span: "span",
    strong: "strong",
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx(_components.hr, {}), "\n", _jsx(_components.h2, {
      children: "title: \"Building a Schema-First Collaborative Form Builder\"\ndate: \"Feb 2026\"\ntags: [\"Next js\", \"Typescript\", \"Supabase\"]"
    }), "\n", _jsx(_components.p, {
      children: "Here is a sample blog post mimicking the style of the portfolio."
    }), "\n", _jsx(_components.h2, {
      children: "The Challenge"
    }), "\n", _jsxs(_components.p, {
      children: ["Forms are everywhere on the web, but building ", _jsx(_components.em, {
        children: "good"
      }), " forms is surprisingly hard. When you introduce the need for advanced features like branching logic, real-time collaboration, and complex validation, the difficulty compounds exponentially."]
    }), "\n", _jsxs(_components.p, {
      children: ["I realized that to build a scalable, collaborative form builder, I needed to rethink the core architecture. The solution I arrived at was a ", _jsx(_components.strong, {
        children: "schema-first approach"
      }), "."]
    }), "\n", _jsx(_components.h3, {
      children: "Why Schema-First?"
    }), "\n", _jsxs(_components.p, {
      children: ["Instead of defining the UI and trying to wrestle the data into shape, a schema-first approach defines the ", _jsx(_components.em, {
        children: "shape of the data"
      }), " first. The UI then becomes a natural projection of that schema."]
    }), "\n", _jsx(_components.figure, {
      "data-rehype-pretty-code-figure": "",
      children: _jsx(_components.pre, {
        tabIndex: "0",
        "data-language": "typescript",
        "data-theme": "github-light github-dark-dimmed",
        children: _jsxs(_components.code, {
          "data-language": "typescript",
          "data-theme": "github-light github-dark-dimmed",
          style: {
            display: "grid"
          },
          children: [_jsxs(_components.span, {
            "data-line": "",
            children: [_jsx(_components.span, {
              style: {
                "--shiki-light": "#D73A49",
                "--shiki-dark": "#F47067"
              },
              children: "type"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#6F42C1",
                "--shiki-dark": "#F69D50"
              },
              children: " FormSchema"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#D73A49",
                "--shiki-dark": "#F47067"
              },
              children: " ="
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: " {"
            })]
          }), "\n", _jsxs(_components.span, {
            "data-line": "",
            children: [_jsx(_components.span, {
              style: {
                "--shiki-light": "#E36209",
                "--shiki-dark": "#F69D50"
              },
              children: "  id"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#D73A49",
                "--shiki-dark": "#F47067"
              },
              children: ":"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#005CC5",
                "--shiki-dark": "#6CB6FF"
              },
              children: " string"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: ";"
            })]
          }), "\n", _jsxs(_components.span, {
            "data-line": "",
            children: [_jsx(_components.span, {
              style: {
                "--shiki-light": "#E36209",
                "--shiki-dark": "#F69D50"
              },
              children: "  fields"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#D73A49",
                "--shiki-dark": "#F47067"
              },
              children: ":"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#6F42C1",
                "--shiki-dark": "#F69D50"
              },
              children: " Array"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: "<{"
            })]
          }), "\n", _jsxs(_components.span, {
            "data-line": "",
            children: [_jsx(_components.span, {
              style: {
                "--shiki-light": "#E36209",
                "--shiki-dark": "#F69D50"
              },
              children: "    type"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#D73A49",
                "--shiki-dark": "#F47067"
              },
              children: ":"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#032F62",
                "--shiki-dark": "#96D0FF"
              },
              children: " 'text'"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#D73A49",
                "--shiki-dark": "#F47067"
              },
              children: " |"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#032F62",
                "--shiki-dark": "#96D0FF"
              },
              children: " 'number'"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#D73A49",
                "--shiki-dark": "#F47067"
              },
              children: " |"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#032F62",
                "--shiki-dark": "#96D0FF"
              },
              children: " 'select'"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#D73A49",
                "--shiki-dark": "#F47067"
              },
              children: " |"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#032F62",
                "--shiki-dark": "#96D0FF"
              },
              children: " 'checkbox'"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: ";"
            })]
          }), "\n", _jsxs(_components.span, {
            "data-line": "",
            children: [_jsx(_components.span, {
              style: {
                "--shiki-light": "#E36209",
                "--shiki-dark": "#F69D50"
              },
              children: "    key"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#D73A49",
                "--shiki-dark": "#F47067"
              },
              children: ":"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#005CC5",
                "--shiki-dark": "#6CB6FF"
              },
              children: " string"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: ";"
            })]
          }), "\n", _jsxs(_components.span, {
            "data-line": "",
            children: [_jsx(_components.span, {
              style: {
                "--shiki-light": "#E36209",
                "--shiki-dark": "#F69D50"
              },
              children: "    label"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#D73A49",
                "--shiki-dark": "#F47067"
              },
              children: ":"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#005CC5",
                "--shiki-dark": "#6CB6FF"
              },
              children: " string"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: ";"
            })]
          }), "\n", _jsxs(_components.span, {
            "data-line": "",
            children: [_jsx(_components.span, {
              style: {
                "--shiki-light": "#E36209",
                "--shiki-dark": "#F69D50"
              },
              children: "    required"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#D73A49",
                "--shiki-dark": "#F47067"
              },
              children: ":"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#005CC5",
                "--shiki-dark": "#6CB6FF"
              },
              children: " boolean"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: ";"
            })]
          }), "\n", _jsxs(_components.span, {
            "data-line": "",
            children: [_jsx(_components.span, {
              style: {
                "--shiki-light": "#E36209",
                "--shiki-dark": "#F69D50"
              },
              children: "    validation"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#D73A49",
                "--shiki-dark": "#F47067"
              },
              children: "?:"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#6F42C1",
                "--shiki-dark": "#F69D50"
              },
              children: " Record"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: "<"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#005CC5",
                "--shiki-dark": "#6CB6FF"
              },
              children: "string"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: ", "
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#005CC5",
                "--shiki-dark": "#6CB6FF"
              },
              children: "any"
            }), _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: ">;"
            })]
          }), "\n", _jsx(_components.span, {
            "data-line": "",
            children: _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: "  }>;"
            })
          }), "\n", _jsx(_components.span, {
            "data-line": "",
            children: _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: "};"
            })
          })]
        })
      })
    }), "\n", _jsx(_components.p, {
      children: "This approach gave me several distinct advantages:"
    }), "\n", _jsxs(_components.ol, {
      children: ["\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Predictability:"
        }), " The data structure is always known and consistent."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Type Safety:"
        }), " By deriving types directly from the schema (using tools like Zod), I could ensure type safety across the entire stack."]
      }), "\n", _jsxs(_components.li, {
        children: [_jsx(_components.strong, {
          children: "Collaboration:"
        }), " A central schema acts as the single source of truth, making it much easier to synchronize state across multiple clients."]
      }), "\n"]
    }), "\n", _jsx(_components.h2, {
      children: "Implementing Collaboration with Supabase"
    }), "\n", _jsx(_components.p, {
      children: "To achieve real-time collaboration, I leveraged Supabase's Realtime subscriptions. When a user updates a field in the form builder, that change is immediately broadcasted to all other connected clients."
    }), "\n", _jsx(_components.h2, {
      children: "Architecture & Math"
    }), "\n", _jsx(_components.p, {
      children: "The data consistency follows a standard CRDT-like mathematical model:"
    }), "\n", _jsx(_components.span, {
      className: "katex-display",
      children: _jsxs(_components.span, {
        className: "katex",
        children: [_jsx(_components.span, {
          className: "katex-mathml",
          children: _jsx(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            display: "block",
            children: _jsxs(_components.semantics, {
              children: [_jsxs(_components.mrow, {
                children: [_jsxs(_components.msub, {
                  children: [_jsx(_components.mi, {
                    children: "S"
                  }), _jsxs(_components.mrow, {
                    children: [_jsx(_components.mi, {
                      children: "t"
                    }), _jsx(_components.mo, {
                      children: "+"
                    }), _jsx(_components.mn, {
                      children: "1"
                    })]
                  })]
                }), _jsx(_components.mo, {
                  children: "="
                }), _jsxs(_components.msub, {
                  children: [_jsx(_components.mi, {
                    children: "S"
                  }), _jsx(_components.mi, {
                    children: "t"
                  })]
                }), _jsx(_components.mo, {
                  children: "∪"
                }), _jsx(_components.mo, {
                  stretchy: "false",
                  children: "{"
                }), _jsxs(_components.msub, {
                  children: [_jsx(_components.mi, {
                    children: "o"
                  }), _jsx(_components.mi, {
                    children: "t"
                  })]
                }), _jsx(_components.mo, {
                  stretchy: "false",
                  children: "}"
                }), _jsx(_components.mo, {
                  children: "∖"
                }), _jsx(_components.mi, {
                  children: "C"
                }), _jsx(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), _jsxs(_components.msub, {
                  children: [_jsx(_components.mi, {
                    children: "o"
                  }), _jsx(_components.mi, {
                    children: "t"
                  })]
                }), _jsx(_components.mo, {
                  stretchy: "false",
                  children: ")"
                })]
              }), _jsx(_components.annotation, {
                encoding: "application/x-tex",
                children: "S_{t+1} = S_t \\cup \\{ o_{t} \\} \\setminus C(o_{t})"
              })]
            })
          })
        }), _jsxs(_components.span, {
          className: "katex-html",
          "aria-hidden": "true",
          children: [_jsxs(_components.span, {
            className: "base",
            children: [_jsx(_components.span, {
              className: "strut",
              style: {
                height: "0.8917em",
                verticalAlign: "-0.2083em"
              }
            }), _jsxs(_components.span, {
              className: "mord",
              children: [_jsx(_components.span, {
                className: "mord mathnormal",
                style: {
                  marginRight: "0.05764em"
                },
                children: "S"
              }), _jsx(_components.span, {
                className: "msupsub",
                children: _jsxs(_components.span, {
                  className: "vlist-t vlist-t2",
                  children: [_jsxs(_components.span, {
                    className: "vlist-r",
                    children: [_jsx(_components.span, {
                      className: "vlist",
                      style: {
                        height: "0.3011em"
                      },
                      children: _jsxs(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "-0.0576em",
                          marginRight: "0.05em"
                        },
                        children: [_jsx(_components.span, {
                          className: "pstrut",
                          style: {
                            height: "2.7em"
                          }
                        }), _jsx(_components.span, {
                          className: "sizing reset-size6 size3 mtight",
                          children: _jsxs(_components.span, {
                            className: "mord mtight",
                            children: [_jsx(_components.span, {
                              className: "mord mathnormal mtight",
                              children: "t"
                            }), _jsx(_components.span, {
                              className: "mbin mtight",
                              children: "+"
                            }), _jsx(_components.span, {
                              className: "mord mtight",
                              children: "1"
                            })]
                          })
                        })]
                      })
                    }), _jsx(_components.span, {
                      className: "vlist-s",
                      children: "​"
                    })]
                  }), _jsx(_components.span, {
                    className: "vlist-r",
                    children: _jsx(_components.span, {
                      className: "vlist",
                      style: {
                        height: "0.2083em"
                      },
                      children: _jsx(_components.span, {})
                    })
                  })]
                })
              })]
            }), _jsx(_components.span, {
              className: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), _jsx(_components.span, {
              className: "mrel",
              children: "="
            }), _jsx(_components.span, {
              className: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            })]
          }), _jsxs(_components.span, {
            className: "base",
            children: [_jsx(_components.span, {
              className: "strut",
              style: {
                height: "0.8333em",
                verticalAlign: "-0.15em"
              }
            }), _jsxs(_components.span, {
              className: "mord",
              children: [_jsx(_components.span, {
                className: "mord mathnormal",
                style: {
                  marginRight: "0.05764em"
                },
                children: "S"
              }), _jsx(_components.span, {
                className: "msupsub",
                children: _jsxs(_components.span, {
                  className: "vlist-t vlist-t2",
                  children: [_jsxs(_components.span, {
                    className: "vlist-r",
                    children: [_jsx(_components.span, {
                      className: "vlist",
                      style: {
                        height: "0.2806em"
                      },
                      children: _jsxs(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "-0.0576em",
                          marginRight: "0.05em"
                        },
                        children: [_jsx(_components.span, {
                          className: "pstrut",
                          style: {
                            height: "2.7em"
                          }
                        }), _jsx(_components.span, {
                          className: "sizing reset-size6 size3 mtight",
                          children: _jsx(_components.span, {
                            className: "mord mathnormal mtight",
                            children: "t"
                          })
                        })]
                      })
                    }), _jsx(_components.span, {
                      className: "vlist-s",
                      children: "​"
                    })]
                  }), _jsx(_components.span, {
                    className: "vlist-r",
                    children: _jsx(_components.span, {
                      className: "vlist",
                      style: {
                        height: "0.15em"
                      },
                      children: _jsx(_components.span, {})
                    })
                  })]
                })
              })]
            }), _jsx(_components.span, {
              className: "mspace",
              style: {
                marginRight: "0.2222em"
              }
            }), _jsx(_components.span, {
              className: "mbin",
              children: "∪"
            }), _jsx(_components.span, {
              className: "mspace",
              style: {
                marginRight: "0.2222em"
              }
            })]
          }), _jsxs(_components.span, {
            className: "base",
            children: [_jsx(_components.span, {
              className: "strut",
              style: {
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), _jsx(_components.span, {
              className: "mopen",
              children: "{"
            }), _jsxs(_components.span, {
              className: "mord",
              children: [_jsx(_components.span, {
                className: "mord mathnormal",
                children: "o"
              }), _jsx(_components.span, {
                className: "msupsub",
                children: _jsxs(_components.span, {
                  className: "vlist-t vlist-t2",
                  children: [_jsxs(_components.span, {
                    className: "vlist-r",
                    children: [_jsx(_components.span, {
                      className: "vlist",
                      style: {
                        height: "0.2806em"
                      },
                      children: _jsxs(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "0em",
                          marginRight: "0.05em"
                        },
                        children: [_jsx(_components.span, {
                          className: "pstrut",
                          style: {
                            height: "2.7em"
                          }
                        }), _jsx(_components.span, {
                          className: "sizing reset-size6 size3 mtight",
                          children: _jsx(_components.span, {
                            className: "mord mtight",
                            children: _jsx(_components.span, {
                              className: "mord mathnormal mtight",
                              children: "t"
                            })
                          })
                        })]
                      })
                    }), _jsx(_components.span, {
                      className: "vlist-s",
                      children: "​"
                    })]
                  }), _jsx(_components.span, {
                    className: "vlist-r",
                    children: _jsx(_components.span, {
                      className: "vlist",
                      style: {
                        height: "0.15em"
                      },
                      children: _jsx(_components.span, {})
                    })
                  })]
                })
              })]
            }), _jsx(_components.span, {
              className: "mclose",
              children: "}"
            }), _jsx(_components.span, {
              className: "mspace",
              style: {
                marginRight: "0.2222em"
              }
            }), _jsx(_components.span, {
              className: "mbin",
              children: "∖"
            }), _jsx(_components.span, {
              className: "mspace",
              style: {
                marginRight: "0.2222em"
              }
            })]
          }), _jsxs(_components.span, {
            className: "base",
            children: [_jsx(_components.span, {
              className: "strut",
              style: {
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), _jsx(_components.span, {
              className: "mord mathnormal",
              style: {
                marginRight: "0.07153em"
              },
              children: "C"
            }), _jsx(_components.span, {
              className: "mopen",
              children: "("
            }), _jsxs(_components.span, {
              className: "mord",
              children: [_jsx(_components.span, {
                className: "mord mathnormal",
                children: "o"
              }), _jsx(_components.span, {
                className: "msupsub",
                children: _jsxs(_components.span, {
                  className: "vlist-t vlist-t2",
                  children: [_jsxs(_components.span, {
                    className: "vlist-r",
                    children: [_jsx(_components.span, {
                      className: "vlist",
                      style: {
                        height: "0.2806em"
                      },
                      children: _jsxs(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "0em",
                          marginRight: "0.05em"
                        },
                        children: [_jsx(_components.span, {
                          className: "pstrut",
                          style: {
                            height: "2.7em"
                          }
                        }), _jsx(_components.span, {
                          className: "sizing reset-size6 size3 mtight",
                          children: _jsx(_components.span, {
                            className: "mord mtight",
                            children: _jsx(_components.span, {
                              className: "mord mathnormal mtight",
                              children: "t"
                            })
                          })
                        })]
                      })
                    }), _jsx(_components.span, {
                      className: "vlist-s",
                      children: "​"
                    })]
                  }), _jsx(_components.span, {
                    className: "vlist-r",
                    children: _jsx(_components.span, {
                      className: "vlist",
                      style: {
                        height: "0.15em"
                      },
                      children: _jsx(_components.span, {})
                    })
                  })]
                })
              })]
            }), _jsx(_components.span, {
              className: "mclose",
              children: ")"
            })]
          })]
        })]
      })
    }), "\n", _jsxs(_components.p, {
      children: ["Where ", _jsxs(_components.span, {
        className: "katex",
        children: [_jsx(_components.span, {
          className: "katex-mathml",
          children: _jsx(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: _jsxs(_components.semantics, {
              children: [_jsx(_components.mrow, {
                children: _jsxs(_components.msub, {
                  children: [_jsx(_components.mi, {
                    children: "S"
                  }), _jsx(_components.mi, {
                    children: "t"
                  })]
                })
              }), _jsx(_components.annotation, {
                encoding: "application/x-tex",
                children: "S_t"
              })]
            })
          })
        }), _jsx(_components.span, {
          className: "katex-html",
          "aria-hidden": "true",
          children: _jsxs(_components.span, {
            className: "base",
            children: [_jsx(_components.span, {
              className: "strut",
              style: {
                height: "0.8333em",
                verticalAlign: "-0.15em"
              }
            }), _jsxs(_components.span, {
              className: "mord",
              children: [_jsx(_components.span, {
                className: "mord mathnormal",
                style: {
                  marginRight: "0.05764em"
                },
                children: "S"
              }), _jsx(_components.span, {
                className: "msupsub",
                children: _jsxs(_components.span, {
                  className: "vlist-t vlist-t2",
                  children: [_jsxs(_components.span, {
                    className: "vlist-r",
                    children: [_jsx(_components.span, {
                      className: "vlist",
                      style: {
                        height: "0.2806em"
                      },
                      children: _jsxs(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "-0.0576em",
                          marginRight: "0.05em"
                        },
                        children: [_jsx(_components.span, {
                          className: "pstrut",
                          style: {
                            height: "2.7em"
                          }
                        }), _jsx(_components.span, {
                          className: "sizing reset-size6 size3 mtight",
                          children: _jsx(_components.span, {
                            className: "mord mathnormal mtight",
                            children: "t"
                          })
                        })]
                      })
                    }), _jsx(_components.span, {
                      className: "vlist-s",
                      children: "​"
                    })]
                  }), _jsx(_components.span, {
                    className: "vlist-r",
                    children: _jsx(_components.span, {
                      className: "vlist",
                      style: {
                        height: "0.15em"
                      },
                      children: _jsx(_components.span, {})
                    })
                  })]
                })
              })]
            })]
          })
        })]
      }), " is the state at time ", _jsxs(_components.span, {
        className: "katex",
        children: [_jsx(_components.span, {
          className: "katex-mathml",
          children: _jsx(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: _jsxs(_components.semantics, {
              children: [_jsx(_components.mrow, {
                children: _jsx(_components.mi, {
                  children: "t"
                })
              }), _jsx(_components.annotation, {
                encoding: "application/x-tex",
                children: "t"
              })]
            })
          })
        }), _jsx(_components.span, {
          className: "katex-html",
          "aria-hidden": "true",
          children: _jsxs(_components.span, {
            className: "base",
            children: [_jsx(_components.span, {
              className: "strut",
              style: {
                height: "0.6151em"
              }
            }), _jsx(_components.span, {
              className: "mord mathnormal",
              children: "t"
            })]
          })
        })]
      }), " and ", _jsxs(_components.span, {
        className: "katex",
        children: [_jsx(_components.span, {
          className: "katex-mathml",
          children: _jsx(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: _jsxs(_components.semantics, {
              children: [_jsx(_components.mrow, {
                children: _jsxs(_components.msub, {
                  children: [_jsx(_components.mi, {
                    children: "o"
                  }), _jsx(_components.mi, {
                    children: "t"
                  })]
                })
              }), _jsx(_components.annotation, {
                encoding: "application/x-tex",
                children: "o_t"
              })]
            })
          })
        }), _jsx(_components.span, {
          className: "katex-html",
          "aria-hidden": "true",
          children: _jsxs(_components.span, {
            className: "base",
            children: [_jsx(_components.span, {
              className: "strut",
              style: {
                height: "0.5806em",
                verticalAlign: "-0.15em"
              }
            }), _jsxs(_components.span, {
              className: "mord",
              children: [_jsx(_components.span, {
                className: "mord mathnormal",
                children: "o"
              }), _jsx(_components.span, {
                className: "msupsub",
                children: _jsxs(_components.span, {
                  className: "vlist-t vlist-t2",
                  children: [_jsxs(_components.span, {
                    className: "vlist-r",
                    children: [_jsx(_components.span, {
                      className: "vlist",
                      style: {
                        height: "0.2806em"
                      },
                      children: _jsxs(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "0em",
                          marginRight: "0.05em"
                        },
                        children: [_jsx(_components.span, {
                          className: "pstrut",
                          style: {
                            height: "2.7em"
                          }
                        }), _jsx(_components.span, {
                          className: "sizing reset-size6 size3 mtight",
                          children: _jsx(_components.span, {
                            className: "mord mathnormal mtight",
                            children: "t"
                          })
                        })]
                      })
                    }), _jsx(_components.span, {
                      className: "vlist-s",
                      children: "​"
                    })]
                  }), _jsx(_components.span, {
                    className: "vlist-r",
                    children: _jsx(_components.span, {
                      className: "vlist",
                      style: {
                        height: "0.15em"
                      },
                      children: _jsx(_components.span, {})
                    })
                  })]
                })
              })]
            })]
          })
        })]
      }), " is an operation."]
    }), "\n", _jsx(_components.h3, {
      children: "Flowchart"
    }), "\n", _jsx(_components.figure, {
      "data-rehype-pretty-code-figure": "",
      children: _jsx(_components.pre, {
        tabIndex: "0",
        "data-language": "mermaid",
        "data-theme": "github-light github-dark-dimmed",
        children: _jsxs(_components.code, {
          "data-language": "mermaid",
          "data-theme": "github-light github-dark-dimmed",
          style: {
            display: "grid"
          },
          children: [_jsx(_components.span, {
            "data-line": "",
            children: _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: "graph TD"
            })
          }), "\n", _jsx(_components.span, {
            "data-line": "",
            children: _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: "  A[Client 1] -->|Update Field| B(Supabase Realtime)"
            })
          }), "\n", _jsx(_components.span, {
            "data-line": "",
            children: _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: "  C[Client 2] -->|Update Field| B"
            })
          }), "\n", _jsx(_components.span, {
            "data-line": "",
            children: _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: "  B -->|Broadcast| A"
            })
          }), "\n", _jsx(_components.span, {
            "data-line": "",
            children: _jsx(_components.span, {
              style: {
                "--shiki-light": "#24292E",
                "--shiki-dark": "#ADBAC7"
              },
              children: "  B -->|Broadcast| C"
            })
          })]
        })
      })
    }), "\n", _jsx(_components.p, {
      children: "By combining the predictability of a schema-first architecture with the power of Supabase Realtime, I was able to create a form builder that is both robust and highly collaborative."
    })]
  });
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

